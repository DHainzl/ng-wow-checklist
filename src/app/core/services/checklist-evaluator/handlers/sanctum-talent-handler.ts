import { combineLatest, Subscription } from 'rxjs';
import { CharacterIngameData } from '../../character-store/character-store.interface';
import { ChecklistItemSanctumTalent } from '../../checklist/checklist.interface';
import { ChecklistHandler } from './_handler';

export class ChecklistSanctumTalentHandler extends ChecklistHandler<ChecklistItemSanctumTalent> {
    subscription: Subscription = new Subscription();

    handlerInit(): void {
        this.subscription = combineLatest([
            this.checklistRequestContainer.ingameDataChanged,
        ]).subscribe(([ ingameData ]) => {
            this.evaluate(ingameData);
        });
    }

    handlerDestroy(): void {
        this.subscription.unsubscribe();
    }

    private evaluate(ingameData: CharacterIngameData | undefined): void {
        if (!ingameData) {
            this._completed$.next('loading');
            this._note$.next({
                type: 'text',
                text: 'Import',
            });
            return;
        }

        const talent = ingameData.sanctum[this.item.talentName] ?? 0;
        const max = this.item.talentName === 'special' ? 5 : 3;

        this._note$.next({
            type: 'text',
            text: `${talent} / ${max}`,
        });

        if (talent < max) {
            this._completed$.next('incomplete');
            return;
        }
        
        this._completed$.next('complete');
    }
}
