import { Pipe, PipeTransform } from '@angular/core';

import { BattleNetEquipmentItem } from '../../core/services/battle-net/character/types/battlenet-equipment';

@Pipe({
    name: 'hoaLevel',
})
export class HoALevelPipe implements PipeTransform {
    transform(equipment: BattleNetEquipmentItem[]): number {
        const hoa = equipment.find(item => item.slot.type === 'NECK' && item.azerite_details);
        if (!hoa) {
            return 0;
        }

        return hoa.azerite_details.level.value;
    }
}
