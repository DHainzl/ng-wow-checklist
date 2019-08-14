import { Pipe, PipeTransform } from '@angular/core';

import { EvaluatedChecklistItem } from '../services/checklist-evaluator/checklist-evaluator.interface';

@Pipe({
    name: 'showCompleted',
})
export class ShowCompletedPipe implements PipeTransform {
    transform(items: EvaluatedChecklistItem[], hideCompleted: boolean): EvaluatedChecklistItem[] {
        if (!hideCompleted) {
            return items;
        }

        return items.filter(item => !item.isCompleted);
    }
}
