import { Injectable } from "@angular/core";
import { ChecklistItem } from "../../checklist/checklist.interface";
import { EvaluatedChecklistItem } from "../evaluated-checklist-item.interface";
import { ChecklistEvaluatorData } from "./_handler.interface";

@Injectable()
export abstract class ChecklistHandler<T extends ChecklistItem> {
    abstract evaluate(item: T, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem;

    getBaseEvaluatedItem(item: T, data: ChecklistEvaluatorData): EvaluatedChecklistItem {
        return {
            completed: 'loading',
            indention: this.getIndention(item, data.allItems),
            label: item.name,
            note: undefined,
            shown: true,
            subitems: [],
            wowheadId: '',
            baseItem: item,
        };
    }

    private getIndention(item: T, allItems: ChecklistItem[]): number {
        if (item.type === 'header') {
            return item.level;
        }

        let lastIndention = 0;
        allItems.find(i => {
            if (i.type === 'header') {
                lastIndention = i.level;
            }

            return i.key === item.key;
        });

        return lastIndention + 1;
    }
}