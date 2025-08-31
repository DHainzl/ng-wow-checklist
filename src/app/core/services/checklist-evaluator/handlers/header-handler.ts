import { inject, Injectable } from '@angular/core';
import { ChecklistItemHeader } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { CHECKLIST_EVALUATED_ITEMS, ChecklistHandler } from './_handler.service';

@Injectable()
export class ChecklistHeaderHandler extends ChecklistHandler<ChecklistItemHeader> {
    private readonly evaluated = inject(CHECKLIST_EVALUATED_ITEMS);

    evaluate(): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem();
        const subitems = this.findSubitems();

        const shownStatus = subitems
            .filter(s => s.shown)
            .filter(s => s.baseItem.type !== 'header')
            .map(s => s.completed);
    
        const isLoading = shownStatus.includes('loading');
        if (isLoading) {
            return {
                ...baseItem,
                completed: 'loading',
                label: this.getHeader(0, 0),
            };
        }

        const numItems = shownStatus.length;
        const completeItems = shownStatus.filter(c => c === 'complete').length;
        const isCompleted = shownStatus.every(c => c === 'complete');

        return {
            ...baseItem,
            completed: isCompleted ? 'complete' : 'incomplete',
            label: this.getHeader(completeItems, numItems),
        }
    }

    private getHeader(completeItems: number, numItems: number): string {
        const tag = 'h' + (this.item.level + 2);
        const completeItemsLabel = numItems === 0 ? '' : ` (${completeItems} / ${numItems})`
        return `<${tag}>${this.item.name}${completeItemsLabel}</${tag}>`;
    }

    private findSubitems(): EvaluatedChecklistItem[] {
        if (this.evaluated.length === 0) {
            return [];
        }

        const nextIndex = this.evaluated.findIndex(item => item.baseItem.type === 'header' && item.baseItem.level <= this.item.level);
        if (nextIndex !== -1) {
            return this.evaluated.slice(0, nextIndex);
        }
        return this.evaluated;
    }
}
