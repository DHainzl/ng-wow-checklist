import { combineLatest, Subscription } from 'rxjs';
import { CharacterIngameData } from '../../character-store/character-store.interface';
import { ChecklistItemSanctumMissionsCount } from '../../checklist/checklist.interface';
import { ChecklistHandler } from './_handler';

export class ChecklistSanctumMissionsCountHandler extends ChecklistHandler<ChecklistItemSanctumMissionsCount> {
    private static readonly MAX_MISSIONS_COUNT: number = 20;

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

    private evaluate(ingameData: CharacterIngameData | undefined): void {
        if (!ingameData || ingameData.missions === undefined) {
            this._completed$.next('loading');
            this._note$.next({
                type: 'text',
                text: 'Import',
            });
            return;
        }

        const completedMissions = ingameData.missions;
        
        this._note$.next({
            type: 'text',
            text: `${completedMissions} / ${ChecklistSanctumMissionsCountHandler.MAX_MISSIONS_COUNT}`,
        });

        if (completedMissions < ChecklistSanctumMissionsCountHandler.MAX_MISSIONS_COUNT) {
            this._completed$.next('incomplete');
            return;
        }

        this._completed$.next('complete');
    }
}
