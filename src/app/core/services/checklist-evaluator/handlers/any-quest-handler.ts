import { Injectable } from '@angular/core';
import { BattleNetQuests } from '../../battle-net/character/types/battlenet-quest';
import { ChecklistItemAnyQuest } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistEvaluatorData } from './_handler.interface';
import { ChecklistHandler } from './_handler.service';

@Injectable({ providedIn: 'root' })
export class ChecklistAnyQuestHandler extends ChecklistHandler<ChecklistItemAnyQuest> {
    evaluate(item: ChecklistItemAnyQuest, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem(item, data);

        if (!data.quests) {
            return {
                ...baseItem,
                completed: 'loading',
                subitems: [],
            };
        }

        const anyCompleted = item.quests.some(q => this.isQuestCompleted(q.id, data.quests));

        if (anyCompleted) {
            return {
                ...baseItem,
                completed: 'complete',
                subitems: [],
            };
        }

        return {
            ...baseItem,
            completed: 'incomplete',
            subitems: this.getSubitems(item),
        };
    }

    private isQuestCompleted(questId: number, quests: BattleNetQuests): boolean {
        return !!quests.quests.find(q => q.id === questId);
    }

    private getSubitems(item: ChecklistItemAnyQuest): string[] {
        return item.quests.map(q => q.name);
    }
}
