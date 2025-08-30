import { Subscription } from 'rxjs';
import { BattleNetEquipment } from '../../battle-net/character/types/battlenet-equipment';
import { ChecklistItemAverageEquipmentLevel } from '../../checklist/checklist.interface';
import { ChecklistHandler } from './_handler';

export class ChecklistAverageEquipmentHandler extends ChecklistHandler<ChecklistItemAverageEquipmentLevel> {
    subscription: Subscription = new Subscription();

    handlerInit(): void {
        this.subscription = this.checklistRequestContainer.equipmentChanged.subscribe(equipment => {
            this.evaluate(equipment);
        });
    }

    handlerDestroy(): void {
        this.subscription.unsubscribe();
    }

    private evaluate(equipment: BattleNetEquipment | undefined): void {
        if (!equipment) {
            this._completed$.next('loading');
            this._subitems$.next([]);
            return;
        }

        const subitems = this.getItemsBelowLevel(equipment);

        if (subitems.length) {
            this._completed$.next('incomplete');
            this._subitems$.next(subitems);
        } else {
            this._completed$.next('complete');
            this._subitems$.next([]);
        }
    }

    private getItemsBelowLevel(equipment: BattleNetEquipment): string[] {
        const excludedKeys = [ 'SHIRT', 'TABARD' ];

        return equipment.equipped_items
            .filter(item => excludedKeys.indexOf(item.slot.type) === -1)
            .filter(item => item.level.value < this.item.max)
            .map(item => {
                return `${item.slot.name} (${item.level.value})`;
            });
    }
}
