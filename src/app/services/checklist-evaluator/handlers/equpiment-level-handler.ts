import { ChecklistItemEquipmentLevel } from 'src/app/services/checklist/checklist.interface';

import { ChecklistHandler, ChecklistHandlerParams } from './_handler';

export class ChecklistEquipmentHandler extends ChecklistHandler<ChecklistItemEquipmentLevel> {
    private static NAME_MAP: { [ slot: string ]: string } = {
        back: 'Back',
        chest: 'Chest',
        feet: 'Feet',
        finger1: 'Finger 1',
        finger2: 'Finger 2',
        hands: 'Hands',
        head: 'Head',
        legs: 'Legs',
        mainHand: 'Main Hand',
        offHand: 'Off-Hand',
        neck: 'Neck',
        shoulder: 'Shoulder',
        trinket1: 'Trinket 1',
        trinket2: 'Trinket 2',
        waist: 'Waist',
        wrist: 'Wrist',
    };

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
        const excludedKeys = [ 'averageItemLevel', 'averageItemLevelEquipped', 'shirt', 'tabard' ];

        return Object.keys(data.characterData.items)
            .filter(key => excludedKeys.indexOf(key) === -1)
            .filter(key => data.characterData.items[key].itemLevel < data.item.max)
            .map(key => {
                const slot = ChecklistEquipmentHandler.NAME_MAP[key];
                const itemLevel = data.characterData.items[key].itemLevel;

                return `${slot} (${itemLevel})`;
            });
    }
}
