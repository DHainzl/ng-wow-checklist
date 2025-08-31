import { inject, Injectable } from '@angular/core';
import { ChecklistItemAverageEquipmentLevel } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { CHECKLIST_EQUIPMENT, ChecklistHandler } from './_handler.service';

@Injectable()
export class ChecklistAverageEquipmentHandler extends ChecklistHandler<ChecklistItemAverageEquipmentLevel> {
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

        const subitems = this.getItemsBelowLevel();

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

    private getItemsBelowLevel(): string[] {
        const excludedKeys = [ 'SHIRT', 'TABARD' ];

        return this.equipment.equipped_items
            .filter(item => !excludedKeys.includes(item.slot.type))
            .filter(item => item.level.value < this.item.max)
            .map(item => {
                return `${item.slot.name} (${item.level.value})`;
            });
    }
}
