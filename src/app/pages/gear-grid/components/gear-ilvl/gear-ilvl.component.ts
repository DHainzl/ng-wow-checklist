import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { BattleNetEquipmentItem } from "../../../../core/services/battle-net/character/types/battlenet-equipment";
import { WowheadItemPipe } from "../../../../shared/pipes/wowhead-item.pipe";

@Component({
    selector: 'gear-ilvl',
    templateUrl: './gear-ilvl.component.html',
    styleUrls: [ 'gear-ilvl.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        WowheadItemPipe,
    ],
})
export class GearIlvlComponent {
    readonly GEAR_LOW = 590;     
    readonly GEAR_MID = 610;     
    readonly GEAR_HIGH = 623;    // TWW S2 Weekly Chest

    readonly equipment = input.required<BattleNetEquipmentItem[]>();
    readonly slot = input.required<string>();

    readonly item = computed(() => {
        if (!this.slot() || !this.equipment()) {
            return undefined;
        }

        return this.equipment().find(eq => eq.slot.type === this.slot());
    });
    readonly itemlevel = computed(() => this.item()?.level?.value || 0);

    readonly noNavHref = `${window?.location.href}#`;            // Necessary for wowhead tooltips
}
