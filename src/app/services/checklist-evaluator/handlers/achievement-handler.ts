import { ChecklistHandler, ChecklistHandlerParams } from './_handler';
import { ChecklistItemAchievement } from 'src/app/services/checklist/checklist.interface';

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
        return `${data.item.type}-${data.item.id}?who=${data.characterData.name}&when=1273022820000`;
    }
}