import { Injectable } from '@angular/core';
import { ChecklistItemSanctumConduit } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistEvaluatorData, ChecklistNote } from './_handler.interface';
import { ChecklistHandler } from './_handler.service';

@Injectable({ providedIn: 'root' })
export class ChecklistSanctumConduitHandler extends ChecklistHandler<ChecklistItemSanctumConduit> {
    private static readonly DESIRED_LEVEL = 239;

    evaluate(item: ChecklistItemSanctumConduit, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem(item, data);

        if (!data.ingameData?.conduits) {
            return {
                ...baseItem,
                completed: 'loading',
                note: {
                    type: 'text',
                    text: 'Import',
                },
            };
        }

        const conduitLevel = data.ingameData.conduits[`${item.conduitId}`] ?? 0;

        const note: ChecklistNote = {
            type: 'text',
            text: `${conduitLevel} / ${ChecklistSanctumConduitHandler.DESIRED_LEVEL}`,
        };

        if (conduitLevel < ChecklistSanctumConduitHandler.DESIRED_LEVEL) {
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
