import { inject, Injectable } from '@angular/core';
import { ChecklistItemSanctumFollowerAny } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistNote } from './_handler.interface';
import { CHECKLIST_INGAMEDATA, ChecklistHandler } from './_handler.service';

@Injectable()
export class ChecklistSanctumFollowerAnyHandler extends ChecklistHandler<ChecklistItemSanctumFollowerAny> {
    private static readonly MAX_FOLLOWER_LEVEL = 60;

    private readonly ingameData = inject(CHECKLIST_INGAMEDATA);

    evaluate(): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem();

        if (!this.ingameData) {
            return {
                ...baseItem,
                completed: 'loading',
                note: {
                    type: 'text',
                    text: 'Import',
                },
            };
        }

        const followerName = this.item.followers
            .find(name => this.ingameData.followers[name]?.collected);
        const follower = this.ingameData.followers[followerName!];
        
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
