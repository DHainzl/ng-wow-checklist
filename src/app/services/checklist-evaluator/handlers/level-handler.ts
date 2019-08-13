import { ChecklistHandler, ChecklistHandlerParams } from './_handler';
import { ChecklistItemLevel } from 'src/app/services/checklist/checklist.interface';

export class ChecklistLevelHandler extends ChecklistHandler<ChecklistItemLevel> {
    isShown(data: ChecklistHandlerParams<ChecklistItemLevel>): boolean {
        return true;
    }
    getNote(data: ChecklistHandlerParams<ChecklistItemLevel>): string {
        if (!this.isCompleted(data)) {
            return `${data.characterData.level} / ${data.item.max}`
        }
        return '';
    }
    isCompleted(data: ChecklistHandlerParams<ChecklistItemLevel>): boolean {
        return data.characterData.level >= data.item.max;
    }
}