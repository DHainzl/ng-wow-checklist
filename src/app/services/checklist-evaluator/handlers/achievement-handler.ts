import { ChecklistItemAchievement } from 'src/app/services/checklist/checklist.interface';

import { ChecklistHandler, ChecklistHandlerParams } from './_handler';

export class ChecklistAchievementHandler extends ChecklistHandler<ChecklistItemAchievement> {
    isShown(data: ChecklistHandlerParams<ChecklistItemAchievement>): boolean {
        return true;
    }
    getNote(data: ChecklistHandlerParams<ChecklistItemAchievement>): string {
        return '';
    }
    isCompleted(data: ChecklistHandlerParams<ChecklistItemAchievement>): boolean {
        return data.characterData.achievements.achievementsCompleted.includes(data.item.id);
    }

    getWowheadId(data: ChecklistHandlerParams<ChecklistItemAchievement>): string {
        let link = `${data.item.type}-${data.item.id}`;

        const achievementIdx = data.characterData.achievements.achievementsCompleted.indexOf(data.item.id);

        if (achievementIdx !== -1) {
            const timestamp = data.characterData.achievements.achievementsCompletedTimestamp[achievementIdx];
            link += `?who=${data.characterData.name}&when=${timestamp}`;
        }

        return link;
    }
}
