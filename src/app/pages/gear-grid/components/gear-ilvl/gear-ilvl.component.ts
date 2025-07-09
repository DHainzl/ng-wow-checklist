import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { BattleNetEquipmentItem } from "src/app/core/services/battle-net/character/types/battlenet-equipment";

@Component({
    selector: 'gear-ilvl',
    templateUrl: './gear-ilvl.component.html',
    styleUrls: [ 'gear-ilvl.component.scss' ],
})
export class GearIlvlComponent implements OnChanges {
    readonly GEAR_LOW = 590;     
    readonly GEAR_MID = 610;     
    readonly GEAR_HIGH = 623;    // TWW S2 Weekly Chest

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
