import { Injectable } from '@angular/core';
import { BattleNetCharacterReputation, BattleNetCharacterReputations } from '../../battle-net/character/types/battlenet-reputation';
import { ChecklistItemReputationRenown } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistEvaluatorData } from './_handler.interface';
import { ChecklistHandler } from './_handler.service';

@Injectable({ providedIn: 'root' })
export class ChecklistReputationRenownHandler extends ChecklistHandler<ChecklistItemReputationRenown> {
    evaluate(item: ChecklistItemReputationRenown, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem(item, data);

        if (!data.reputations) {
            return {
                ...baseItem,
                completed: 'loading',
                note: undefined,
            };
        }

        const reputation = this.getReputation(item, data.reputations);
        const label = this.getLabel(item);

        if (!reputation) {
            return {
                ...baseItem,
                label,
                completed: 'incomplete',
            };
        }

        const isCompleted = (reputation.standing.renown_level ?? 0) >= item.max;

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
                    text: `${reputation.standing.renown_level ?? 0} / ${item.max}`,
                },
            };
        }
    }

    private getLabel(item: ChecklistItemReputationRenown): string {
        return `${item.name}: Renown ${item.max}`;
    }

    private getReputation(item: ChecklistItemReputationRenown, reputations: BattleNetCharacterReputations): BattleNetCharacterReputation | undefined {
        return reputations.reputations.find(reputation => reputation.faction.id === item.id);
    }
}
