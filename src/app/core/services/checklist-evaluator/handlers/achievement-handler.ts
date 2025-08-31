import { inject, Injectable } from '@angular/core';
import { BattleNetAchievement } from '../../battle-net/character/types/battlenet-achievement';
import { ChecklistItemAchievement } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { CHECKLIST_ACHIEVEMENTS, CHECKLIST_PROFILE, ChecklistHandler } from './_handler.service';

@Injectable()
export class ChecklistAchievementHandler extends ChecklistHandler<ChecklistItemAchievement> {
    private readonly achievements = inject(CHECKLIST_ACHIEVEMENTS);
    private readonly profile = inject(CHECKLIST_PROFILE);

    evaluate(): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem();

        if (!this.achievements || !this.profile) {
            return { ...baseItem, completed: 'loading' };
        }

        const achievement = this.achievements.achievements.find(av => av.id === this.item.id);
        const wowheadId = this.getWowheadId(achievement);

        if (!achievement || !achievement.criteria.is_completed) {
            return { ...baseItem, wowheadId, completed: 'incomplete' };
        }
        
        return { ...baseItem, wowheadId, completed: 'complete' };
    }

    getWowheadId(achievement: BattleNetAchievement | undefined): string {
        let link = `achievement-${this.item.id}`;

        if (!achievement) {
            return link;
        }

        if (achievement.criteria.is_completed) {
            link += `?who=${this.profile.name}&when=${achievement.completed_timestamp}`;
        }

        return link;
    }
}
