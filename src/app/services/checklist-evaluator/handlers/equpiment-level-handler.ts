import { ChecklistHandler, ChecklistHandlerParams } from './_handler';
import { ChecklistItemEquipmentLevel } from 'src/app/services/checklist/checklist.interface';

export class ChecklistEquipmentHandler extends ChecklistHandler<ChecklistItemEquipmentLevel> {
    isShown(data: ChecklistHandlerParams<ChecklistItemEquipmentLevel>): boolean {
        return true;
    }
    getNote(data: ChecklistHandlerParams<ChecklistItemEquipmentLevel>): string {
        return '';
    }
    isCompleted(data: ChecklistHandlerParams<ChecklistItemEquipmentLevel>): boolean {
        const excludedKeys = [ 'averageItemLevel', 'averageItemLevelEquipped', 'shirt', 'tabard' ];

        const itemsBelowLevel = Object.keys(data.characterData.items)
            .filter(key => excludedKeys.indexOf(key) === -1)
            .filter(key => data.characterData.items[key].itemLevel < data.item.max);

        console.log('Items below item level', itemsBelowLevel);
        return itemsBelowLevel.length === 0;
    }
}