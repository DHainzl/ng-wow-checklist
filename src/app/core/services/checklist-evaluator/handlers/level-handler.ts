import { Injectable } from '@angular/core';
import { ChecklistItemLevel } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistEvaluatorData } from './_handler.interface';
import { ChecklistHandler } from './_handler.service';

@Injectable({ providedIn: 'root' })
export class ChecklistLevelHandler extends ChecklistHandler<ChecklistItemLevel> {
    evaluate(item: ChecklistItemLevel, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem {
        const baseItem = {
            ...this.getBaseEvaluatedItem(item, data),
        };

        if (!data.profile) {
            return {
                ...baseItem,
                completed: 'loading',
                note: undefined,
            };
        }

        const isCompleted = data.profile.level >= item.max;

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
                    text: `${data.profile.level} / ${item.max}`,
                }
            };
        }
    }
}
