import { CharacterInfo } from 'src/app/services/character-store/character-store.interface';
import { Checklist, ChecklistItem } from 'src/app/services/checklist/checklist.interface';

import { AllCharacterData } from '../checklist-evaluator.interface';

export interface ChecklistHandlerParams<T extends ChecklistItem> {
    item: T;
    characterData: AllCharacterData;
    overrides: CharacterInfo['overrides'];
    checklist: Checklist['items'];
}

export abstract class ChecklistHandler<T extends ChecklistItem> {
    abstract isShown(data: ChecklistHandlerParams<T>): boolean;
    abstract getNote(data: ChecklistHandlerParams<T>): string;
    abstract isCompleted(data: ChecklistHandlerParams<T>): boolean;

    getHeader(data: ChecklistHandlerParams<T>): string {
        return data.item.name;
    }
    getSubitems(data: ChecklistHandlerParams<T>): string[] {
        return [];
    }
    getWowheadId(data: ChecklistHandlerParams<T>): string {
        return `${data.item.type}-${data.item.id}`;
    }
}
