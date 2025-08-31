import { inject, Injectable } from '@angular/core';
import { ChecklistItemAnyQuest } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { CHECKLIST_QUESTS, ChecklistHandler } from './_handler.service';

@Injectable()
export class ChecklistAnyQuestHandler extends ChecklistHandler<ChecklistItemAnyQuest> {
    private readonly quests = inject(CHECKLIST_QUESTS);

    evaluate(): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem();

        if (!this.quests) {
            return {
                ...baseItem,
                completed: 'loading',
                subitems: [],
            };
        }

        const anyCompleted = this.item.quests.some(q => this.isQuestCompleted(q.id));

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
            subitems: this.getSubitems(),
        };
    }

    private isQuestCompleted(questId: number): boolean {
        return !!this.quests.quests.find(q => q.id === questId);
    }

    private getSubitems(): string[] {
        return this.item.quests.map(q => q.name);
    }
}
