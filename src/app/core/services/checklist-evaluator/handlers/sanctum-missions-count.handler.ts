import { Injectable } from '@angular/core';
import { ChecklistItemSanctumMissionsCount } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistEvaluatorData, ChecklistNote } from './_handler.interface';
import { ChecklistHandler } from './_handler.service';

@Injectable({ providedIn: 'root' })
export class ChecklistSanctumMissionsCountHandler extends ChecklistHandler<ChecklistItemSanctumMissionsCount> {
    private static readonly MAX_MISSIONS_COUNT: number = 20;

    evaluate(item: ChecklistItemSanctumMissionsCount, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem(item, data);

        if (!data.ingameData || data.ingameData.missions === undefined) {
            return {
                ...baseItem,
                completed: 'loading',
                note: {
                    type: 'text',
                    text: 'Import',
                },
            };
        }

        const completedMissions = data.ingameData.missions;
        
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
