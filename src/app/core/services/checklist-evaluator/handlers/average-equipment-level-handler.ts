import { Injectable } from '@angular/core';
import { BattleNetEquipment } from '../../battle-net/character/types/battlenet-equipment';
import { ChecklistItemAverageEquipmentLevel } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistEvaluatorData } from './_handler.interface';
import { ChecklistHandler } from './_handler.service';

@Injectable({ providedIn: 'root' })
export class ChecklistAverageEquipmentHandler extends ChecklistHandler<ChecklistItemAverageEquipmentLevel> {
    evaluate(item: ChecklistItemAverageEquipmentLevel, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem(item, data);

        if (!data.equipment) {
            return {
                ...baseItem,
                completed: 'loading',
                subitems: [],
            };
        }

        const subitems = this.getItemsBelowLevel(item, data.equipment);

        if (subitems.length) {
            return {
                ...baseItem,
                completed: 'incomplete',
                subitems: subitems,
            };
        } else {
            return {
                ...baseItem,
                completed: 'complete',
                subitems: [],
            };
        }
    }

    private getItemsBelowLevel(item: ChecklistItemAverageEquipmentLevel, equipment: BattleNetEquipment): string[] {
        const excludedKeys = [ 'SHIRT', 'TABARD' ];

        return equipment.equipped_items
            .filter(i => !excludedKeys.includes(i.slot.type))
            .filter(i => i.level.value < item.max)
            .map(i => {
                return `${i.slot.name} (${i.level.value})`;
            });
    }
}
