import { combineLatest, Subscription } from 'rxjs';
import { BattleNetCharacterReputation } from 'src/app/services/battle-net/character/character.interface';
import { CharacterInfo } from 'src/app/services/character-store/character-store.interface';
import { ChecklistItemReputation } from 'src/app/services/checklist/checklist.interface';

import { ChecklistHandler } from './_handler';

export class ChecklistReputationHandler extends ChecklistHandler<ChecklistItemReputation> {
    subscription: Subscription = new Subscription();

    handlerInit(): void {
        this.subscription = combineLatest(
            this.checklistRequestContainer.reputationChanged,
            this.checklistRequestContainer.overridesChanged,
        ).subscribe(([ reputations, overrides ]) => {
            this.evaluate(reputations, overrides);
        });
    }

    handlerDestroy(): void {
        this.subscription.unsubscribe();
    }

    private evaluate(reputations: BattleNetCharacterReputation[], overrides: CharacterInfo['overrides']): void {
        if (!reputations || !overrides) {
            this._completed$.next('loading');
            this._note$.next(undefined);
            return;
        }

        const max = this.getMax(this.item, overrides);
        const reputation = this.getReputation(reputations);

        if (!reputation) {
            this._completed$.next('incomplete');
            return;
        }

        const isCompleted = reputation.standing >= max;

        this._label$.next(this.getLabel(overrides, max));

        if (isCompleted) {
            this._completed$.next('complete');
            this._note$.next(undefined);
        } else {
            this._completed$.next('incomplete');
            this._note$.next({
                type: 'text',
                text: `${reputation.value} / ${reputation.max}`,
            });
        }

    }

    private getLabel(overrides: CharacterInfo['overrides'], max: number): string {
        const reputationNames = [ 'Hated', 'Hostile', 'Unfriendly', 'Neutral', 'Friendly', 'Honored', 'Revered', 'Exalted' ];

        return `${this.item.name} / ${reputationNames[max]}`;
    }

    private getReputation(reputations: BattleNetCharacterReputation[]): BattleNetCharacterReputation {
        return reputations.find(reputation => reputation.id === this.item.id);
    }

    private getMax(item: ChecklistItemReputation, overrides: CharacterInfo['overrides']): number {
        const override = overrides[item.key];

        if (override && override.type === 'reputation') {
            return override.max;
        }

        return item.max;
    }
}
