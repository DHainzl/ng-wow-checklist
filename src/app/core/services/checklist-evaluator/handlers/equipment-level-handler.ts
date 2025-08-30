import { Subscription } from 'rxjs';
import { BattleNetEquipment, BattleNetEquipmentItem } from '../../battle-net/character/types/battlenet-equipment';
import { ChecklistItemEquipmentLevel } from '../../checklist/checklist.interface';
import { ChecklistHandler } from './_handler';

export class ChecklistEquipmentHandler extends ChecklistHandler<ChecklistItemEquipmentLevel> {
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

        const item = this.getItem(equipment);
        if (!item) {
            this._note$.next({
                type: 'text',
                text: 'Not equipped',
            });
            this._completed$.next('incomplete');
            return;
        }

        this._note$.next({
            type: 'text',
            text: `${item.level.value} / ${this.item.level}`,
        });

        if (item.level.value >= this.item.level) {
            this._completed$.next('complete');
        } else {
            this._completed$.next('incomplete');
        }
    }

    private getItem(equipment: BattleNetEquipment): BattleNetEquipmentItem | undefined {
        return equipment.equipped_items.find(item => item.slot.type === this.item.slot);
    }
}
