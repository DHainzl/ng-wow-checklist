import { Injectable } from '@angular/core';
import { ChecklistItemHeader } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistHandler } from './_handler.service';

@Injectable()
export class ChecklistHeaderHandler extends ChecklistHandler<ChecklistItemHeader> {
    evaluate(): EvaluatedChecklistItem {
        throw new Error('Headers are handled directly and should not be evaluated!');
    }
}
