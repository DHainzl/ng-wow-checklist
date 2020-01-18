import { combineLatest, Subscription } from 'rxjs';
import { CharacterInfo } from 'src/app/core/services/character-store/character-store.interface';
import { ChecklistItemReputation } from 'src/app/core/services/checklist/checklist.interface';

import { BattleNetCharacterReputation, BattleNetCharacterReputations } from '../../battle-net/character/types/battlenet-reputation';

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

    private evaluate(reputations: BattleNetCharacterReputations, overrides: CharacterInfo['overrides']): void {
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

        const isCompleted = reputation.standing.tier >= max;

        this._label$.next(this.getLabel(overrides, max));

        if (isCompleted) {
            this._completed$.next('complete');
            this._note$.next(undefined);
        } else {
            this._completed$.next('incomplete');
            this._note$.next({
                type: 'text',
                text: `${reputation.standing.value} / ${reputation.standing.max}`,
            });
        }

    }

    private getLabel(overrides: CharacterInfo['overrides'], max: number): string {
        const reputationNames = [ 'Hated', 'Hostile', 'Unfriendly', 'Neutral', 'Friendly', 'Honored', 'Revered', 'Exalted' ];

        return `${this.item.name}: ${reputationNames[max]}`;
    }

    private getReputation(reputations: BattleNetCharacterReputations): BattleNetCharacterReputation {
        return reputations.reputations.find(reputation => reputation.faction.id === this.item.id);
    }

    private getMax(item: ChecklistItemReputation, overrides: CharacterInfo['overrides']): number {
        const override = overrides[item.key];

        if (override && override.type === 'reputation') {
            return override.max;
        }

        return item.max;
    }
}
