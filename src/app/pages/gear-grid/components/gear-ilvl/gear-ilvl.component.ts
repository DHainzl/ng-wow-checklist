import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { BattleNetEquipmentItem } from "src/app/core/services/battle-net/character/types/battlenet-equipment";

@Component({
    selector: 'gear-ilvl',
    templateUrl: './gear-ilvl.component.html',
    styleUrls: [ 'gear-ilvl.component.scss' ],
})
export class GearIlvlComponent implements OnChanges {
    readonly GEAR_LOW = 385;     // Forbidden Reach Catchup ilvl base
    readonly GEAR_MID = 395;     // Forbidden Reach Catchup ilvl upgraded 
    readonly GEAR_HIGH = 402;    // Timewalking / HC upgrade

    @Input()
    equipment: BattleNetEquipmentItem[];

    @Input()
    slot: string;

    item: BattleNetEquipmentItem | undefined;
    noNavHref = `${window?.location.href}#`;            // Necessary for wowhead tooltips

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.slot || changes.equipment) {
            this.getItem();
        }
    }

    private getItem() {
        if (!this.slot || !this.equipment) {
            this.item = undefined;
            return;
        }

        this.item = this.equipment.find(eq => eq.slot.type === this.slot);
    }
}
