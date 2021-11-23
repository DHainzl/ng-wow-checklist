import { combineLatest, Subscription } from 'rxjs';
import { CharacterIngameData } from 'src/app/core/services/character-store/character-store.interface';
import { ChecklistItemSanctumFollowerAny } from 'src/app/core/services/checklist/checklist.interface';

import { ChecklistHandler } from './_handler';

export class ChecklistSanctumFollowerAnyHandler extends ChecklistHandler<ChecklistItemSanctumFollowerAny> {
    private static readonly MAX_FOLLOWER_LEVEL = 60;

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
        if (!ingameData) {
            this._label$.next(this.item.name);
            this._completed$.next('loading');
            this._note$.next({
                type: 'text',
                text: 'Import',
            });
            return;
        }

        const followerName = this.item.followers
            .find(name => ingameData.followers[name]?.collected);
        const follower = ingameData.followers[followerName];
        
        if (!follower || !follower.collected) {
            this._label$.next(this.item.name);
            this._completed$.next('incomplete');
            this._note$.next({
                type: 'text',
                text: 'Not collected',
            });
            return;
        }
        
        this._label$.next(followerName);
        this._note$.next({
            type: 'text',
            text: `Lvl. ${follower.level} / ${ChecklistSanctumFollowerAnyHandler.MAX_FOLLOWER_LEVEL}`,
        });

        if (follower.level < ChecklistSanctumFollowerAnyHandler.MAX_FOLLOWER_LEVEL) {
            this._completed$.next('incomplete');
            return;
        }

        this._completed$.next('complete');
    }
}
