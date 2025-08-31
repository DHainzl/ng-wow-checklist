import { Injectable } from '@angular/core';
import { BattleNetAchievement } from '../../battle-net/character/types/battlenet-achievement';
import { BattleNetProfile } from '../../battle-net/character/types/battlenet-profile';
import { ChecklistItemAchievement } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistEvaluatorData } from './_handler.interface';
import { ChecklistHandler } from './_handler.service';

@Injectable({ providedIn: 'root' })
export class ChecklistAchievementHandler extends ChecklistHandler<ChecklistItemAchievement> {
    evaluate(item: ChecklistItemAchievement, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem(item, data);

        if (!data.achievements || !data.profile) {
            return { ...baseItem, completed: 'loading' };
        }

        const achievement = data.achievements.achievements.find(av => av.id === item.id);
        const wowheadId = this.getWowheadId(item, achievement, data.profile);

        if (!achievement || !achievement.criteria.is_completed) {
            return { ...baseItem, wowheadId, completed: 'incomplete' };
        }
        
        return { ...baseItem, wowheadId, completed: 'complete' };
    }

    getWowheadId(item: ChecklistItemAchievement, achievement: BattleNetAchievement | undefined, profile: BattleNetProfile): string {
        let link = `achievement-${item.id}`;

        if (!achievement) {
            return link;
        }

        if (achievement.criteria.is_completed) {
            link += `?who=${profile.name}&when=${achievement.completed_timestamp}`;
        }

        return link;
    }
}
