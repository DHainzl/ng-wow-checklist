import { ChecklistItem, ChecklistItemHeader } from 'src/app/services/checklist/checklist.interface';

import { ChecklistEvaluatorService } from '../checklist-evaluator.service';

import { ChecklistHandler, ChecklistHandlerParams } from './_handler';

export class ChecklistHeaderHandler extends ChecklistHandler<ChecklistItemHeader> {
    getHeader(data: ChecklistHandlerParams<ChecklistItemHeader>): string {
        const tag = 'h' + (data.item.level + 2);
        return `<${tag}>${data.item.name}</${tag}>`;
    }
    isShown(data: ChecklistHandlerParams<ChecklistItemHeader>): boolean {
        return true;
    }
    getNote(data: ChecklistHandlerParams<ChecklistItemHeader>): string {
        return '';
    }
    isCompleted(data: ChecklistHandlerParams<ChecklistItemHeader>): boolean {
        const subitems = this.findSubitems(data);

        if (subitems.length === 0) {
            return true;
        }

        return subitems
            .filter(item => {
                return ChecklistEvaluatorService.getHandler(item.type).isShown(this.getHandlerParams(item, data));
            })
            .every(item => {
                return ChecklistEvaluatorService.getHandler(item.type).isCompleted(this.getHandlerParams(item, data));
            });
    }

    private findSubitems(data: ChecklistHandlerParams<ChecklistItemHeader>): ChecklistItem[] {
        const currentIndex = data.checklist.findIndex(item => item.key === data.item.key);
        if (currentIndex + 1 >= data.checklist.length) {
            return [];
        }

        const fromCurrent = data.checklist.slice(currentIndex + 1);
        const nextIndex = fromCurrent.findIndex(item => item.type === 'header' && item.level <= data.item.level);

        if (nextIndex !== -1) {
            return fromCurrent.slice(0, nextIndex);
        }
        return fromCurrent;
    }

    private getHandlerParams(
        item: ChecklistItem,
        data: ChecklistHandlerParams<ChecklistItemHeader>,
    ): ChecklistHandlerParams<ChecklistItem> {
        return {
            item,
            characterData: data.characterData,
            checklist: data.checklist,
            overrides: data.overrides,
        };
    }
}
