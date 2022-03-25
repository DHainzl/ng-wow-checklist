import { combineLatest, Subscription } from 'rxjs';
import { CharacterIngameData } from 'src/app/core/services/character-store/character-store.interface';
import { ChecklistItemSanctumConduit } from 'src/app/core/services/checklist/checklist.interface';

import { ChecklistHandler } from './_handler';

export class ChecklistSanctumConduitHandler extends ChecklistHandler<ChecklistItemSanctumConduit> {
    private static readonly DESIRED_LEVEL = 239;

    subscription: Subscription = new Subscription();

    handlerInit(): void {
        this.subscription = combineLatest([
            this.checklistRequestContainer.ingameDataChanged
            ,
        ]).subscribe(([ ingameData ]) => {
            this.evaluate(ingameData);
        });
    }

    handlerDestroy(): void {
        this.subscription.unsubscribe();
    }

    private evaluate(ingameData: CharacterIngameData): void {
        if (!ingameData?.conduits) {
            this._completed$.next('loading');
            this._note$.next({
                type: 'text',
                text: 'Import',
            });
            return;
        }

        const conduitLevel = ingameData.conduits[`${this.item.conduitId}`] ?? 0;

        this._note$.next({
            type: 'text',
            text: `${conduitLevel} / ${ChecklistSanctumConduitHandler.DESIRED_LEVEL}`,
        });

        if (conduitLevel < ChecklistSanctumConduitHandler.DESIRED_LEVEL) {
            this._completed$.next('incomplete');
            return;
        }
        
        this._completed$.next('complete');
    }
}
