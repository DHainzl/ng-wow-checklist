import { Injectable } from '@angular/core';
import {
    BattleNetProfession,
    BattleNetProfessionSkill,
    isTieredProfession
} from '../../battle-net/character/types/battlenet-profession';
import { ChecklistItemPrimaryProfession, ChecklistItemSecondaryProfession } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistEvaluatorData } from './_handler.interface';
import { ChecklistHandler } from './_handler.service';

@Injectable({ providedIn: 'root' })
export class ChecklistPrimaryProfessionHandler extends ChecklistHandler<ChecklistItemPrimaryProfession> {
    evaluate(item: ChecklistItemPrimaryProfession, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem(item, data);
    
        if (!data.professions || !data.professions.primaries) {
            return {
                ...baseItem,
                completed: 'loading',
                shown: false,
                note: undefined,
            };
        }

        const profession = getProfession(data.professions.primaries, item);

        if (!profession) {
            return {
                ...baseItem,
                shown: false,
            }
        }

        const isComplete = profession.skill_points >= profession.max_skill_points;

        return {
            ...baseItem,
            completed: isComplete ? 'complete' : 'incomplete',
            shown: true,
            note: {
                type: 'text',
                text: `${profession.skill_points} / ${profession.max_skill_points}`,
            },
        };
    }
}

export function getProfession(
    professions: BattleNetProfession[],
    item: ChecklistItemPrimaryProfession | ChecklistItemSecondaryProfession,
): BattleNetProfessionSkill | undefined {
    for (const profession of professions) {
        if (isTieredProfession(profession)) {
            const prof = profession.tiers.find(tier => tier.tier.id === item.id);
            if (prof) {
                return prof;
            }
        } else {
            if (profession.profession.id === item.id) {
                return profession;
            }
        }
    }

    return undefined;
}
