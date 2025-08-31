import { inject, Injectable } from '@angular/core';
import { ChecklistItemSanctumLegendary } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistNote } from './_handler.interface';
import { CHECKLIST_INGAMEDATA, ChecklistHandler } from './_handler.service';

@Injectable()
export class ChecklistSanctumLegendaryHandler extends ChecklistHandler<ChecklistItemSanctumLegendary> {
    private readonly ingameData = inject(CHECKLIST_INGAMEDATA);

    evaluate(): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem();

        if (!this.ingameData?.powers) {
            return {
                ...baseItem,
                completed: 'loading',
                note: {
                    type: 'text',
                    text: 'Import',
                },
            };
        }

        const note: ChecklistNote = {
            type: 'text',
            text: '',
        };

        const power = this.ingameData.powers[this.item.name];
        const completed = power?.learned;

        return {
            ...baseItem,
            note,
            completed: completed ? 'complete' : 'incomplete',
        };
    }
}
