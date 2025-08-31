import { inject, Injectable } from '@angular/core';
import { ChecklistItemLevel } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { CHECKLIST_PROFILE, ChecklistHandler } from './_handler.service';

@Injectable()
export class ChecklistLevelHandler extends ChecklistHandler<ChecklistItemLevel> {
    private readonly profile = inject(CHECKLIST_PROFILE);

    evaluate(): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem();

        if (!this.profile) {
            return {
                ...baseItem,
                completed: 'loading',
                note: undefined,
            };
        }

        const isCompleted = this.profile.level >= this.item.max;

        if (isCompleted) {
            return {
                ...baseItem,
                completed: 'complete',
                note: undefined,
            };
        } else {
            return {
                ...baseItem,
                completed: 'incomplete',
                note: {
                    type: 'text',
                    text: `${this.profile.level} / ${this.item.max}`,
                }
            };
        }
    }
}
