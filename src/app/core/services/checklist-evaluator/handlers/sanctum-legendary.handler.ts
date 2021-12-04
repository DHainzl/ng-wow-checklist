import { combineLatest, Subscription } from 'rxjs';
import { CharacterIngameData } from 'src/app/core/services/character-store/character-store.interface';
import { ChecklistItemSanctumLegendary } from 'src/app/core/services/checklist/checklist.interface';

import { ChecklistHandler } from './_handler';

export class ChecklistSanctumLegendaryHandler extends ChecklistHandler<ChecklistItemSanctumLegendary> {
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
        if (!ingameData?.powers) {
            this._completed$.next('loading');
            this._note$.next({
                type: 'text',
                text: 'Import',
            });
            return;
        }

        this._note$.next({
            type: 'text',
            text: '',
        });

        const power = ingameData.powers[this.item.name];
        
        if (!power?.learned) {
            this._completed$.next('incomplete');
            return;
        }

        this._completed$.next('complete');
    }
}
