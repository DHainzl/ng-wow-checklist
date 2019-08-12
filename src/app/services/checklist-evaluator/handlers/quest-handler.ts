import { ChecklistHandler, ChecklistHandlerParams } from './_handler';
import { ChecklistItemQuest } from 'src/app/services/checklist/checklist.interface';

export class ChecklistQuestHandler extends ChecklistHandler<ChecklistItemQuest> {
    isShown(data: ChecklistHandlerParams<ChecklistItemQuest>): boolean {
        return true;
    }
    getNote(data: ChecklistHandlerParams<ChecklistItemQuest>): string {
        return '';
    }
    isCompleted(data: ChecklistHandlerParams<ChecklistItemQuest>): boolean {
        return data.characterData.quests.includes(data.item.id);
    }
}