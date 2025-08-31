import { inject, Injectable } from '@angular/core';
import { ChecklistItemQuest } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { CHECKLIST_INGAMEDATA, CHECKLIST_QUESTS, ChecklistHandler } from './_handler.service';

@Injectable()
export class ChecklistQuestHandler extends ChecklistHandler<ChecklistItemQuest> {
    private readonly quests = inject(CHECKLIST_QUESTS);
    private readonly ingameData = inject(CHECKLIST_INGAMEDATA);

    evaluate(): EvaluatedChecklistItem {
        const baseItem = {
            ...this.getBaseEvaluatedItem(),
            wowheadId: `quest-${this.item.id}`,
        };

        if (!this.quests) {
            return { ...baseItem, completed: 'loading' };
        }

        const completedQuest = this.quests.quests.find(quest => quest.id === this.item.id);

        // API responded true
        if (completedQuest) {
            return { ...baseItem, completed: 'complete' };
        }

        // Hidden quests might be reported by ingame addon
        const completedIngame = this.ingameData?.quests?.[`${this.item.id}`] ?? false;
        return {
            ...baseItem,
            completed: completedIngame ? 'complete' : 'incomplete',
        };
    }
}
