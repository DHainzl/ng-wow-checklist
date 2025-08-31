import { Injectable } from '@angular/core';
import { ChecklistItemRenown } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistEvaluatorData } from './_handler.interface';
import { ChecklistHandler } from './_handler.service';

@Injectable({ providedIn: 'root' })
export class ChecklistRenownHandler extends ChecklistHandler<ChecklistItemRenown> {
    evaluate(item: ChecklistItemRenown, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem(item, data);
    
        if (!data.profile) {
            return {
                ...baseItem,
                completed: 'loading',
                note: undefined,
            };
        }

        const isCompleted = (data.profile.covenant_progress?.renown_level ?? 0) >= item.threshold;

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
                    text: `${data.profile.covenant_progress?.renown_level ?? 0} / ${item.threshold}`,
                },
            };
        }
    }
}
