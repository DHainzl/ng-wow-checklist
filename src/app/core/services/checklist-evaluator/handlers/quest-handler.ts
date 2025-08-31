import { Injectable } from '@angular/core';
import { ChecklistItemQuest } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistEvaluatorData } from './_handler.interface';
import { ChecklistHandler } from './_handler.service';

@Injectable({ providedIn: 'root' })
export class ChecklistQuestHandler extends ChecklistHandler<ChecklistItemQuest> {
    evaluate(item: ChecklistItemQuest, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem {
        const baseItem = {
            ...this.getBaseEvaluatedItem(item, data),
            wowheadId: `quest-${item.id}`,
        };

        if (!data.quests) {
            return { ...baseItem, completed: 'loading' };
        }

        const completedQuest = data.quests.quests.find(quest => quest.id === item.id);

        // API responded true
        if (completedQuest) {
            return { ...baseItem, completed: 'complete' };
        }

        // Hidden quests might be reported by ingame addon
        const completedIngame = data.ingameData?.quests?.[`${item.id}`] ?? false;
        return {
            ...baseItem,
            completed: completedIngame ? 'complete' : 'incomplete',
        };
    }
}
