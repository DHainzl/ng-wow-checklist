import { Subscription } from 'rxjs';
import { ChecklistItemQuest } from 'src/app/services/checklist/checklist.interface';

import { ChecklistHandler } from './_handler';

export class ChecklistQuestHandler extends ChecklistHandler<ChecklistItemQuest> {
    subscription: Subscription = new Subscription();

    handlerInit(): void {
        this.subscription = this.checklistRequestContainer.questsChanged.subscribe(quests => {
            this.evaluate(quests);
        });
        this._wowheadId$.next(`quest-${this.item.id}`);
    }

    handlerDestroy(): void {
        this.subscription.unsubscribe();
    }

    private evaluate(quests: number[]): void {
        if (!quests) {
            this._completed$.next('loading');
            return;
        }

        const isCompleted = quests.includes(this.item.id);

        this._completed$.next(isCompleted ? 'complete' : 'incomplete');
    }
}
