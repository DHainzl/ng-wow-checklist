import { Injectable } from '@angular/core';
import { ChecklistItemSanctumTalent } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistEvaluatorData, ChecklistNote } from './_handler.interface';
import { ChecklistHandler } from './_handler.service';

@Injectable({ providedIn: 'root' })
export class ChecklistSanctumTalentHandler extends ChecklistHandler<ChecklistItemSanctumTalent> {
    evaluate(item: ChecklistItemSanctumTalent, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem {
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

        const talent = data.ingameData.sanctum[item.talentName] ?? 0;
        const max = item.talentName === 'special' ? 5 : 3;

        const note: ChecklistNote = {
            type: 'text',
            text: `${talent} / ${max}`,
        };

        if (talent < max) {
            return {
                ...baseItem,
                note,
                completed: 'incomplete',
            }
        }

        return {
            ...baseItem,
            note,
            completed: 'complete',
        }
    }
}
