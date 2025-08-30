import { Subscription } from 'rxjs';
import { BattleNetProfile } from '../../battle-net/character/types/battlenet-profile';
import { ChecklistItemLevel } from '../../checklist/checklist.interface';
import { ChecklistHandler } from './_handler';

export class ChecklistLevelHandler extends ChecklistHandler<ChecklistItemLevel> {
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

        const isCompleted = profile.level >= this.item.max;

        if (isCompleted) {
            this._completed$.next('complete');
            this._note$.next(undefined);
        } else {
            this._completed$.next('incomplete');
            this._note$.next({
                type: 'text',
                text: `${profile.level} / ${this.item.max}`,
            });
        }
    }
}
