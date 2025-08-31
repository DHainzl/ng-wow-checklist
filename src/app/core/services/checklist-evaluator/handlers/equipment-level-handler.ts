import { Injectable } from '@angular/core';
import { BattleNetEquipment, BattleNetEquipmentItem } from '../../battle-net/character/types/battlenet-equipment';
import { ChecklistItemEquipmentLevel } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistEvaluatorData, ChecklistNote } from './_handler.interface';
import { ChecklistHandler } from './_handler.service';

@Injectable({ providedIn: 'root' })
export class ChecklistEquipmentHandler extends ChecklistHandler<ChecklistItemEquipmentLevel> {
    evaluate(item: ChecklistItemEquipmentLevel, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem(item, data);

        if (!data.equipment) {
            return {
                ...baseItem,
                completed: 'loading',
                subitems: [],
            };
        }

        const equippedItem = this.getItem(item, data.equipment);
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
            text: `${equippedItem.level.value} / ${item.level}`,
        }

        if (equippedItem.level.value >= item.level) {
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

    private getItem(item: ChecklistItemEquipmentLevel, equipment: BattleNetEquipment): BattleNetEquipmentItem | undefined {
        return equipment.equipped_items.find(i => i.slot.type === item.slot);
    }
}
