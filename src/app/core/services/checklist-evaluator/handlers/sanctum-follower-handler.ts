import { inject, Injectable } from '@angular/core';
import { ChecklistItemSanctumFollower } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistNote } from './_handler.interface';
import { CHECKLIST_INGAMEDATA, ChecklistHandler } from './_handler.service';

@Injectable()
export class ChecklistSanctumFollowerHandler extends ChecklistHandler<ChecklistItemSanctumFollower> {
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

        const follower = this.ingameData.followers[this.item.name];
        
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
