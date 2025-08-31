import { Injectable } from '@angular/core';
import { ChecklistItemSanctumLegendary } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistEvaluatorData, ChecklistNote } from './_handler.interface';
import { ChecklistHandler } from './_handler.service';

@Injectable({ providedIn: 'root' })
export class ChecklistSanctumLegendaryHandler extends ChecklistHandler<ChecklistItemSanctumLegendary> {
    evaluate(item: ChecklistItemSanctumLegendary, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem(item, data);

        if (!data.ingameData?.powers) {
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

        const power = data.ingameData.powers[item.name];
        const completed = power?.learned;

        return {
            ...baseItem,
            note,
            completed: completed ? 'complete' : 'incomplete',
        };
    }
}
