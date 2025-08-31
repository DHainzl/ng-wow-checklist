import { Injectable } from '@angular/core';
import { BattleNetCharacterReputation, BattleNetCharacterReputations } from '../../battle-net/character/types/battlenet-reputation';
import { CharacterInfo } from '../../character-store/character-store.interface';
import { ChecklistItemReputation } from '../../checklist/checklist.interface';
import { ReputationTiersService } from '../../reputation-tiers/reputation-tiers.service';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistEvaluatorData } from './_handler.interface';
import { ChecklistHandler } from './_handler.service';

@Injectable({ providedIn: 'root' })
export class ChecklistReputationHandler extends ChecklistHandler<ChecklistItemReputation> {
    tiersService: ReputationTiersService = new ReputationTiersService();

    evaluate(item: ChecklistItemReputation, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem(item, data);
        
        if (!data.reputations || !data.characterInfo.overrides) {
            return {
                ...baseItem,
                completed: 'loading',
                note: undefined,
            };
        }
        
        const max = this.getMax(item, data.characterInfo.overrides);
        const reputation = this.getReputation(item, data.reputations);
        const label = this.getLabel(item, max);

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

    private getLabel(item: ChecklistItemReputation, max: number): string {
        const tiers = this.tiersService.getTiers(item.id);

        return `${item.name}: ${tiers.tiers[max].name}`;
    }

    private getReputation(item: ChecklistItemReputation, reputations: BattleNetCharacterReputations): BattleNetCharacterReputation | undefined {
        return reputations.reputations.find(reputation => reputation.faction.id === item.id);
    }

    private getMax(item: ChecklistItemReputation, overrides: CharacterInfo['overrides']): number {
        const override = overrides[item.key];

        if (override && override.type === 'reputation') {
            return override.max;
        }

        return item.max;
    }
}
