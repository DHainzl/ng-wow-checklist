import { inject, Injectable } from '@angular/core';
import { BattleNetCharacterReputation } from '../../battle-net/character/types/battlenet-reputation';
import { ChecklistItemReputation } from '../../checklist/checklist.interface';
import { ReputationTiersService } from '../../reputation-tiers/reputation-tiers.service';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { CHECKLIST_CHARACTERINFO, CHECKLIST_REPUTATIONS, ChecklistHandler } from './_handler.service';

@Injectable()
export class ChecklistReputationHandler extends ChecklistHandler<ChecklistItemReputation> {
    private readonly tiersService = inject(ReputationTiersService);

    private readonly reputations = inject(CHECKLIST_REPUTATIONS);
    private readonly characterInfo = inject(CHECKLIST_CHARACTERINFO);

    evaluate(): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem();
        
        if (!this.reputations || !this.characterInfo.overrides) {
            return {
                ...baseItem,
                completed: 'loading',
                note: undefined,
            };
        }
        
        const max = this.getMax();
        const reputation = this.getReputation();
        const label = this.getLabel(max);

        if (!reputation) {
            return {
                ...baseItem,
                label,
                completed: 'incomplete',
            };
        }

        const isCompleted = (reputation.standing.tier ?? 0) >= max;

        if (isCompleted) {
            return {
                ...baseItem,
                label,
                completed: 'complete',
                note: undefined,
            };
        } else {
            return {
                ...baseItem,
                label,
                completed: 'incomplete',
                note: {
                    type: 'text',
                    text: `${reputation.standing.value} / ${reputation.standing.max}`,
                },
            };
        }
    }

    private getLabel(max: number): string {
        const tiers = this.tiersService.getTiers(this.item.id);

        return `${this.item.name}: ${tiers.tiers[max].name}`;
    }

    private getReputation(): BattleNetCharacterReputation | undefined {
        return this.reputations.reputations.find(reputation => reputation.faction.id === this.item.id);
    }

    private getMax(): number {
        const override = this.characterInfo.overrides[this.item.key];

        if (override && override.type === 'reputation') {
            return override.max;
        }

        return this.item.max;
    }
}
