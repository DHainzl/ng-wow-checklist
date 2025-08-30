import { Subscription } from 'rxjs';
import { BattleNetQuests } from '../../battle-net/character/types/battlenet-quest';
import { ChecklistItemAnyQuest } from '../../checklist/checklist.interface';
import { ChecklistHandler } from './_handler';

export class ChecklistAnyQuestHandler extends ChecklistHandler<ChecklistItemAnyQuest> {
    subscription: Subscription = new Subscription();

    handlerInit(): void {
        this.subscription = this.checklistRequestContainer.questsChanged.subscribe(quests => {
            this.evaluate(quests);
        });
    }

    handlerDestroy(): void {
        this.subscription.unsubscribe();
    }

    private evaluate(quests: BattleNetQuests | undefined): void {
        if (!quests) {
            this._completed$.next('loading');
            this._subitems$.next([]);
            return;
        }

        const anyCompleted = this.item.quests.some(q => this.isQuestCompleted(q.id, quests));

        if (anyCompleted) {
            this._completed$.next('complete');
            this._subitems$.next([]);
            return;
        }

        this._completed$.next('incomplete');
        this._subitems$.next(this.getSubitems());
    }

    private isQuestCompleted(questId: number, quests: BattleNetQuests): boolean {
        return !!quests.quests.find(q => q.id === questId);
    }

    private getSubitems(): string[] {
        return this.item.quests.map(q => q.name);
    }
}
