
import { inject, Injectable } from '@angular/core';
import { ChecklistItemSecondaryProfession } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { CHECKLIST_CHARACTERINFO, CHECKLIST_PROFESSIONS, ChecklistHandler } from './_handler.service';
import { getProfession } from './primary-profession-handler';

@Injectable()
export class ChecklistSecondaryProfessionHandler extends ChecklistHandler<ChecklistItemSecondaryProfession> {
    private readonly professions = inject(CHECKLIST_PROFESSIONS);
    private readonly characterInfo = inject(CHECKLIST_CHARACTERINFO);

    evaluate(): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem();

        if (!this.professions || !this.professions.secondaries || !this.characterInfo.overrides) {
            return {
                ...baseItem,
                shown: false,
                note: undefined,
                completed: 'loading',
            };
        }

        const profession = getProfession(this.professions.secondaries, this.item);
        const isEnabled = this.isEnabled();

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

    private isEnabled(): boolean {
        const override = this.characterInfo.overrides[this.item.key];

        if (override && override.type === 'profession-secondary') {
            return override.enabled;
        }

        return false;
    }
}
