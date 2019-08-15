import { ChecklistItemAchievement } from 'src/app/services/checklist/checklist.interface';

import { BattleNetAchievement } from '../../battle-net/character/types/battlenet-achievement';

import { ChecklistHandler, ChecklistHandlerParams } from './_handler';

export class ChecklistAchievementHandler extends ChecklistHandler<ChecklistItemAchievement> {
    isShown(data: ChecklistHandlerParams<ChecklistItemAchievement>): boolean {
        return true;
    }
    getNote(data: ChecklistHandlerParams<ChecklistItemAchievement>): string {
        return '';
    }
    isCompleted(data: ChecklistHandlerParams<ChecklistItemAchievement>): boolean {
        const achievement = this.getAchievement(data);

        if (!achievement) {
            return false;
        }

        return achievement.criteria.is_completed;
    }

    getWowheadId(data: ChecklistHandlerParams<ChecklistItemAchievement>): string {
        let link = `${data.item.type}-${data.item.id}`;
        const achievement = this.getAchievement(data);

        if (!achievement) {
            return link;
        }

        if (achievement.criteria.is_completed) {
            link += `?who=${data.characterData.profile.name}&when=${achievement.completed_timestamp}`;
        }

        return link;
    }

    private getAchievement(data: ChecklistHandlerParams<ChecklistItemAchievement>): BattleNetAchievement {
        return data.characterData.achievements.achievements.find(av => av.id === data.item.id);
    }
}
