import { ChecklistItemEquipmentLevel } from 'src/app/services/checklist/checklist.interface';

import { ChecklistHandler, ChecklistHandlerParams } from './_handler';

export class ChecklistEquipmentHandler extends ChecklistHandler<ChecklistItemEquipmentLevel> {
    isShown(data: ChecklistHandlerParams<ChecklistItemEquipmentLevel>): boolean {
        return true;
    }
    getNote(data: ChecklistHandlerParams<ChecklistItemEquipmentLevel>): string {
        return '';
    }
    isCompleted(data: ChecklistHandlerParams<ChecklistItemEquipmentLevel>): boolean {
        return this.getItemsBelowLevel(data).length === 0;
    }
    getSubitems(data: ChecklistHandlerParams<ChecklistItemEquipmentLevel>): string[] {
        return this.getItemsBelowLevel(data);
    }

    private getItemsBelowLevel(data: ChecklistHandlerParams<ChecklistItemEquipmentLevel>): string[] {
        const excludedKeys = [ 'SHIRT', 'TABARD' ];

        return data.characterData.equipment.equipped_items
            .filter(item => excludedKeys.indexOf(item.slot.type) === -1)
            .filter(item => item.level.value < data.item.max)
            .map(item => {
                return `${item.slot.name} (${item.level.value})`;
            });
    }
}
