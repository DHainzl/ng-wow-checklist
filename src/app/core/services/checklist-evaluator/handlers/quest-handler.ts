import { Subscription, combineLatest } from 'rxjs';
import { ChecklistItemQuest } from 'src/app/core/services/checklist/checklist.interface';

import { BattleNetQuests } from '../../battle-net/character/types/battlenet-quest';

import { ChecklistHandler } from './_handler';
import { CharacterIngameData } from '../../character-store/character-store.interface';

export class ChecklistQuestHandler extends ChecklistHandler<ChecklistItemQuest> {
    subscription: Subscription = new Subscription();

    handlerInit(): void {
        this.subscription = combineLatest([
            this.checklistRequestContainer.questsChanged,
            this.checklistRequestContainer.ingameDataChanged,
        ]) .subscribe(([ quests, ingameData ]) => {
            this.evaluate(quests, ingameData);
        });

        this._wowheadId$.next(`quest-${this.item.id}`);
    }

    handlerDestroy(): void {
        this.subscription.unsubscribe();
    }

    private evaluate(quests: BattleNetQuests, ingameData: CharacterIngameData): void {
        if (!quests) {
            this._completed$.next('loading');
            return;
        }

        const completedQuest = quests.quests.find(quest => quest.id === this.item.id);
        // API responded true
        if (completedQuest) {
            this._completed$.next('complete');
            return;    
        }

        // Hidden quests might be reported by ingame addon
        const completedIngame = ingameData?.quests?.[`${this.item.id}`] ?? false;
        this._completed$.next(completedIngame ? 'complete' : 'incomplete');
    }
}
