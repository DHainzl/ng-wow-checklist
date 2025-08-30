import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { environment } from "../../../../../environments/environment";
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
    readonly GEAR_LOW = environment.gearGridLow;     
    readonly GEAR_MID = environment.gearGridMid;     
    readonly GEAR_HIGH = environment.gearGridHigh;

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
