import { Injectable } from '@angular/core';
import { ChecklistItemSanctumFollower } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistEvaluatorData, ChecklistNote } from './_handler.interface';
import { ChecklistHandler } from './_handler.service';

@Injectable({ providedIn: 'root' })
export class ChecklistSanctumFollowerHandler extends ChecklistHandler<ChecklistItemSanctumFollower> {
    private static readonly MAX_FOLLOWER_LEVEL = 60;

    evaluate(item: ChecklistItemSanctumFollower, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem(item, data);

        if (!data.ingameData) {
            return {
                ...baseItem,
                completed: 'loading',
                note: {
                    type: 'text',
                    text: 'Import',
                },
            };
        }

        const follower = data.ingameData.followers[item.name];
        
        if (!follower || !follower.collected) {
            return {
                ...baseItem,
                completed: 'incomplete',
                note: {
                    type: 'text',
                    text: 'Not collected',
                },
            };
        }
        
        const note: ChecklistNote = {
            type: 'text',
            text: `Lvl. ${follower.level} / ${ChecklistSanctumFollowerHandler.MAX_FOLLOWER_LEVEL}`,
        };

        if (follower.level < ChecklistSanctumFollowerHandler.MAX_FOLLOWER_LEVEL) {
            return {
                ...baseItem,
                note,
                completed: 'incomplete',
            };
        }

        return {
            ...baseItem,
            note,
            completed: 'complete',
        };
    }
}
