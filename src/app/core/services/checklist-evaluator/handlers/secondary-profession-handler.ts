
import { Injectable } from '@angular/core';
import { CharacterInfo } from '../../character-store/character-store.interface';
import { ChecklistItemSecondaryProfession } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistEvaluatorData } from './_handler.interface';
import { ChecklistHandler } from './_handler.service';
import { getProfession } from './primary-profession-handler';

@Injectable({ providedIn: 'root' })
export class ChecklistSecondaryProfessionHandler extends ChecklistHandler<ChecklistItemSecondaryProfession> {
    evaluate(item: ChecklistItemSecondaryProfession, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem(item, data);

        if (!data.professions || !data.professions.secondaries || !data.characterInfo.overrides) {
            return {
                ...baseItem,
                shown: false,
                note: undefined,
                completed: 'loading',
            };
        }

        const profession = getProfession(data.professions.secondaries, item);
        const isEnabled = this.isEnabled(data.characterInfo.overrides, item);

        if (!profession || !isEnabled) {
            return {
                ...baseItem,
                shown: false,
            };
        }

        const isCompleted = profession.skill_points >= profession.max_skill_points;

        return {
            ...baseItem,
            completed: isCompleted ? 'complete' : 'incomplete',
            shown: true,
            note: {
                type: 'text',
                text: `${profession.skill_points} / ${profession.max_skill_points}`,
            }
        };
    }

    private isEnabled(overrides: CharacterInfo['overrides'], item: ChecklistItemSecondaryProfession): boolean {
        const override = overrides[item.key];

        if (override && override.type === 'profession-secondary') {
            return override.enabled;
        }

        return false;
    }
}
