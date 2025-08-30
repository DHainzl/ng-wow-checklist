import { combineLatest, Subscription } from 'rxjs';
import { BattleNetCharacterReputation, BattleNetCharacterReputations } from '../../battle-net/character/types/battlenet-reputation';
import { CharacterInfo } from '../../character-store/character-store.interface';
import { ChecklistItemReputation } from '../../checklist/checklist.interface';
import { ReputationTiersService } from '../../reputation-tiers/reputation-tiers.service';
import { ChecklistHandler } from './_handler';

export class ChecklistReputationHandler extends ChecklistHandler<ChecklistItemReputation> {
    subscription: Subscription = new Subscription();
    tiersService: ReputationTiersService = new ReputationTiersService();

    handlerInit(): void {
        this.subscription = combineLatest([
            this.checklistRequestContainer.reputationChanged,
            this.checklistRequestContainer.overridesChanged,
        ]).subscribe(([ reputations, overrides ]) => {
            this.evaluate(reputations, overrides);
        });
    }

    handlerDestroy(): void {
        this.subscription.unsubscribe();
    }

    private evaluate(reputations: BattleNetCharacterReputations | undefined, overrides: CharacterInfo['overrides']): void {
        if (!reputations || !overrides) {
            this._completed$.next('loading');
            this._note$.next(undefined);
            return;
        }
        
        const max = this.getMax(this.item, overrides);
        const reputation = this.getReputation(reputations);
        this._label$.next(this.getLabel(max));

        if (!reputation) {
            this._completed$.next('incomplete');
            return;
        }

        const isCompleted = (reputation.standing.tier ?? 0) >= max;

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

    private getLabel(max: number): string {
        const tiers = this.tiersService.getTiers(this.item.id);

        return `${this.item.name}: ${tiers.tiers[max].name}`;
    }

    private getReputation(reputations: BattleNetCharacterReputations): BattleNetCharacterReputation | undefined {
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
