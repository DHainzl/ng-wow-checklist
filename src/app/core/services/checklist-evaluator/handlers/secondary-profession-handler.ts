
import { inject, Injectable } from '@angular/core';
import { ChecklistItemSecondaryProfession } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { CHECKLIST_CHARACTERINFO, CHECKLIST_PROFESSIONS, ChecklistHandler } from './_handler.service';
import { getProfession } from './primary-profession-handler';

@Injectable()
export class ChecklistSecondaryProfessionHandler extends ChecklistHandler<ChecklistItemSecondaryProfession> {
    public static readonly GLOBAL_OVERRIDE_KEY = '__global-profession-secondary';

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

        if (!isEnabled) {
            return {
                ...baseItem,
                shown: false,
            };
        }

        if (!profession) {
            return {
                ...baseItem,
                completed: 'incomplete',
                shown: true,
                note: {
                    type: 'text',
                    text: 'Not learned',
                },
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
        const specificOverride = this.characterInfo.overrides[this.item.key];
        if (specificOverride && specificOverride.type === 'profession-secondary') {
            return specificOverride.enabled;
        }

        const genericOverride = this.characterInfo.overrides[ChecklistSecondaryProfessionHandler.GLOBAL_OVERRIDE_KEY];
        if (genericOverride && genericOverride.type === 'profession-secondary') {
            return genericOverride.enabled;
        }

        return false;
    }
}
