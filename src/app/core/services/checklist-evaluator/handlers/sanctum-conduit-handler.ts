import { inject, Injectable } from '@angular/core';
import { ChecklistItemSanctumConduit } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistNote } from './_handler.interface';
import { CHECKLIST_INGAMEDATA, ChecklistHandler } from './_handler.service';

@Injectable()
export class ChecklistSanctumConduitHandler extends ChecklistHandler<ChecklistItemSanctumConduit> {
    private static readonly DESIRED_LEVEL = 239;

    private readonly ingameData = inject(CHECKLIST_INGAMEDATA);

    evaluate(): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem();

        if (!this.ingameData?.conduits) {
            return {
                ...baseItem,
                completed: 'loading',
                note: {
                    type: 'text',
                    text: 'Import',
                },
            };
        }

        const conduitLevel = this.ingameData.conduits[`${this.item.conduitId}`] ?? 0;

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
