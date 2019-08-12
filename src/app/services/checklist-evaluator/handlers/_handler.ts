import { BattleNetCharacter } from 'src/app/services/battle-net/character/character.interface';
import { CharacterInfo } from 'src/app/services/character-store/character-store.interface';
import { Checklist, ChecklistItem } from 'src/app/services/checklist/checklist.interface';

export interface ChecklistHandlerParams<T extends ChecklistItem> {
    item: T;
    characterData: BattleNetCharacter;
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
}