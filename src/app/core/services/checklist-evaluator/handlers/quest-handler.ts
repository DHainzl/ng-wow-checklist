import { Subscription } from 'rxjs';
import { ChecklistItemQuest } from 'src/app/core/services/checklist/checklist.interface';

import { BattleNetQuests } from '../../battle-net/character/types/battlenet-quest';

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

    private evaluate(quests: BattleNetQuests): void {
        if (!quests) {
            this._completed$.next('loading');
            return;
        }

        const completedQuest = quests.quests.find(quest => quest.id === this.item.id);
        this._completed$.next(completedQuest ? 'complete' : 'incomplete');
    }
}
