import { Injectable } from '@angular/core';
import { ChecklistItemHeader } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistEvaluatorData } from './_handler.interface';
import { ChecklistHandler } from './_handler.service';

@Injectable({ providedIn: 'root' })
export class ChecklistHeaderHandler extends ChecklistHandler<ChecklistItemHeader> {
    evaluate(item: ChecklistItemHeader, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem(item, data);
        const subitems = this.findSubitems(item, evaluated);

        const shownStatus = subitems
            .filter(s => s.shown)
            .filter(s => s.baseItem.type !== 'header')
            .map(s => s.completed);
    
        const isLoading = shownStatus.includes('loading');
        if (isLoading) {
            return {
                ...baseItem,
                completed: 'loading',
                label: this.getHeader(item, 0, 0),
            };
        }

        const numItems = shownStatus.length;
        const completeItems = shownStatus.filter(c => c === 'complete').length;
        const isCompleted = shownStatus.every(c => c === 'complete');

        return {
            ...baseItem,
            completed: isCompleted ? 'complete' : 'incomplete',
            label: this.getHeader(item, completeItems, numItems),
        }
    }

    private getHeader(item: ChecklistItemHeader, completeItems: number, numItems: number): string {
        const tag = 'h' + (item.level + 2);
        const completeItemsLabel = numItems === 0 ? '' : ` (${completeItems} / ${numItems})`
        return `<${tag}>${item.name}${completeItemsLabel}</${tag}>`;
    }

    private findSubitems(item: ChecklistItemHeader, evaluated: EvaluatedChecklistItem[]): EvaluatedChecklistItem[] {
        if (evaluated.length === 0) {
            return [];
        }

        const nextIndex = evaluated.findIndex(i => i.baseItem.type === 'header' && i.baseItem.level <= item.level);
        if (nextIndex !== -1) {
            return evaluated.slice(0, nextIndex);
        }
        return evaluated;
    }
}
