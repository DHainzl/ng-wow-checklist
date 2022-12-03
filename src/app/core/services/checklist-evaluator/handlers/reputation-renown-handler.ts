import { Subscription } from 'rxjs';
import { ChecklistItemReputationRenown } from 'src/app/core/services/checklist/checklist.interface';

import { BattleNetCharacterReputation, BattleNetCharacterReputations } from '../../battle-net/character/types/battlenet-reputation';

import { ChecklistHandler } from './_handler';

export class ChecklistReputationRenownHandler extends ChecklistHandler<ChecklistItemReputationRenown> {
    subscription: Subscription = new Subscription();

    handlerInit(): void {
        this.subscription = this.checklistRequestContainer.reputationChanged.subscribe(reputations => {
            this.evaluate(reputations);
        });
    }

    handlerDestroy(): void {
        this.subscription.unsubscribe();
    }

    private evaluate(reputations: BattleNetCharacterReputations): void {
        if (!reputations) {
            this._completed$.next('loading');
            this._note$.next(undefined);
            return;
        }

        const reputation = this.getReputation(reputations);
        this._label$.next(this.getLabel());

        if (!reputation) {
            this._completed$.next('incomplete');
            return;
        }

        const isCompleted = reputation.standing.renown_level >= this.item.max;

        if (isCompleted) {
            this._completed$.next('complete');
            this._note$.next(undefined);
        } else {
            this._completed$.next('incomplete');
            this._note$.next({
                type: 'text',
                text: `${reputation.standing.renown_level ?? 0} / ${this.item.max}`,
            });
        }
    }

    private getLabel(): string {
        return `${this.item.name}: Renown ${this.item.max}`;
    }

    private getReputation(reputations: BattleNetCharacterReputations): BattleNetCharacterReputation {
        return reputations.reputations.find(reputation => reputation.faction.id === this.item.id);
    }
}
