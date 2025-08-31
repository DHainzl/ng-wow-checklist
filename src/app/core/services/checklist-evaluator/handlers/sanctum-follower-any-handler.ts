import { Injectable } from '@angular/core';
import { ChecklistItemSanctumFollowerAny } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistEvaluatorData, ChecklistNote } from './_handler.interface';
import { ChecklistHandler } from './_handler.service';

@Injectable({ providedIn: 'root' })
export class ChecklistSanctumFollowerAnyHandler extends ChecklistHandler<ChecklistItemSanctumFollowerAny> {
    private static readonly MAX_FOLLOWER_LEVEL = 60;

    evaluate(item: ChecklistItemSanctumFollowerAny, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem {
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

        const followerName = item.followers
            .find(name => data.ingameData.followers[name]?.collected);
        const follower = data.ingameData.followers[followerName!];
        
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

        const label = followerName!;
        const note: ChecklistNote = {
            type: 'text',
            text: `Lvl. ${follower.level} / ${ChecklistSanctumFollowerAnyHandler.MAX_FOLLOWER_LEVEL}`,
        };

        if (follower.level < ChecklistSanctumFollowerAnyHandler.MAX_FOLLOWER_LEVEL) {
            return {
                ...baseItem,
                label,
                note,
                completed: 'incomplete',
            };
        }

        return {
            ...baseItem,
            label,
            note,
            completed: 'complete',
        };
    }
}
