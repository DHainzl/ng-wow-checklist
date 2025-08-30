import { Pipe, PipeTransform } from "@angular/core";
import { BattleNetEquipmentItem } from "../../core/services/battle-net/character/types/battlenet-equipment";

@Pipe({
    name: 'wowheadItem',
})
export class WowheadItemPipe implements PipeTransform {
    transform(item: BattleNetEquipmentItem | undefined): string {
        if (!item) {
            return '';
        }

        let url = `item=${item.item.id}`;

        if (item.bonus_list) {
            url += `&bonus=${item.bonus_list.join(':')}`;
        }

        if (item.sockets) {
            url += `&gems=${item.sockets.map(s => s.item?.id).join(':')}`;
        }

        if (item.level) {
            url += `&ilvl=${item.level.value}`;
        }

        return url;
    }
}