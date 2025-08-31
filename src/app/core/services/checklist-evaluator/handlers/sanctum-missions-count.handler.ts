import { inject, Injectable } from '@angular/core';
import { ChecklistItemSanctumMissionsCount } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistNote } from './_handler.interface';
import { CHECKLIST_INGAMEDATA, ChecklistHandler } from './_handler.service';

@Injectable()
export class ChecklistSanctumMissionsCountHandler extends ChecklistHandler<ChecklistItemSanctumMissionsCount> {
    private static readonly MAX_MISSIONS_COUNT: number = 20;

    private readonly ingameData = inject(CHECKLIST_INGAMEDATA);

    evaluate(): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem();

        if (!this.ingameData || this.ingameData.missions === undefined) {
            return {
                ...baseItem,
                completed: 'loading',
                note: {
                    type: 'text',
                    text: 'Import',
                },
            };
        }

        const completedMissions = this.ingameData.missions;
        
        const note: ChecklistNote = {
            type: 'text',
            text: `${completedMissions} / ${ChecklistSanctumMissionsCountHandler.MAX_MISSIONS_COUNT}`,
        };
        const isCompleted = completedMissions >= ChecklistSanctumMissionsCountHandler.MAX_MISSIONS_COUNT;

        return {
            ...baseItem,
            note,
            completed: isCompleted ? 'complete' : 'incomplete',
        };
    }
}
