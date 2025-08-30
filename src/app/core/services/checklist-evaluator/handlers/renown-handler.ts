import { Subscription } from 'rxjs';
import { BattleNetProfile } from '../../battle-net/character/types/battlenet-profile';
import { ChecklistItemRenown } from '../../checklist/checklist.interface';
import { ChecklistHandler } from './_handler';

export class ChecklistRenownHandler extends ChecklistHandler<ChecklistItemRenown> {
    subscription: Subscription = new Subscription();

    handlerInit(): void {
        this.subscription = this.checklistRequestContainer.profileChanged.subscribe(profile => {
            this.evaluate(profile);
        });
    }

    handlerDestroy(): void {
        this.subscription.unsubscribe();
    }

    private evaluate(profile: BattleNetProfile | undefined): void {
        if (!profile) {
            this._completed$.next('loading');
            this._note$.next(undefined);
            return;
        }

        const isCompleted = (profile.covenant_progress?.renown_level ?? 0) >= this.item.threshold;

        if (isCompleted) {
            this._completed$.next('complete');
            this._note$.next(undefined);
        } else {
            this._completed$.next('incomplete');
            this._note$.next({
                type: 'text',
                text: `${profile.covenant_progress?.renown_level ?? 0} / ${this.item.threshold}`,
            });
        }
    }
}
