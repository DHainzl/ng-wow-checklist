import { inject, Injectable } from '@angular/core';
import { ChecklistItemSanctumTalent } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistNote } from './_handler.interface';
import { CHECKLIST_INGAMEDATA, ChecklistHandler } from './_handler.service';

@Injectable()
export class ChecklistSanctumTalentHandler extends ChecklistHandler<ChecklistItemSanctumTalent> {
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

        const talent = this.ingameData.sanctum[this.item.talentName] ?? 0;
        const max = this.item.talentName === 'special' ? 5 : 3;

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
