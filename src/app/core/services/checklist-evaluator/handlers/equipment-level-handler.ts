import { inject, Injectable } from '@angular/core';
import { BattleNetEquipmentItem } from '../../battle-net/character/types/battlenet-equipment';
import { ChecklistItemEquipmentLevel } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistNote } from './_handler.interface';
import { CHECKLIST_EQUIPMENT, ChecklistHandler } from './_handler.service';

@Injectable()
export class ChecklistEquipmentHandler extends ChecklistHandler<ChecklistItemEquipmentLevel> {
    private readonly equipment = inject(CHECKLIST_EQUIPMENT);

    evaluate(): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem();

        if (!this.equipment) {
            return {
                ...baseItem,
                completed: 'loading',
                subitems: [],
            };
        }

        const equippedItem = this.getItem();
        if (!equippedItem) {
            return {
                ...baseItem,
                completed: 'incomplete',
                note: {
                    type: 'text',
                    text: 'Not equipped',
                }
            };
        }

        const note: ChecklistNote = {
            type: 'text',
            text: `${equippedItem.level.value} / ${this.item.level}`,
        }

        if (equippedItem.level.value >= this.item.level) {
            return {
                ...baseItem,
                note,
                completed: 'complete',
            };
        } else {
            return {
                ...baseItem,
                note,
                completed: 'incomplete',
            };
        }
    }

    private getItem(): BattleNetEquipmentItem | undefined {
        return this.equipment.equipped_items.find(item => item.slot.type === this.item.slot);
    }
}
