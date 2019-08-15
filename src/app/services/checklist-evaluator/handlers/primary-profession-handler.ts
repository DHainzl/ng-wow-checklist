import { BattleNetCharacter, BattleNetCharacterProfession } from 'src/app/services/battle-net/character/character.interface';
import { ChecklistItemPrimaryProfession } from 'src/app/services/checklist/checklist.interface';

import { ChecklistHandler, ChecklistHandlerParams } from './_handler';

export class ChecklistPrimaryProfessionHandler extends ChecklistHandler<ChecklistItemPrimaryProfession> {
    isShown(data: ChecklistHandlerParams<ChecklistItemPrimaryProfession>): boolean {
        return !!this.getProfession(data.item, data.characterData.mainCharacter);
    }
    getNote(data: ChecklistHandlerParams<ChecklistItemPrimaryProfession>): string {
        const profession = this.getProfession(data.item, data.characterData.mainCharacter);
        if (!profession) {
            return '';
        }

        return `${profession.rank} / ${data.item.max}`;
    }
    isCompleted(data: ChecklistHandlerParams<ChecklistItemPrimaryProfession>): boolean {
        const profession = this.getProfession(data.item, data.characterData.mainCharacter);
        if (!profession) {
            return false;
        }

        return profession.rank >= data.item.max;
    }

    private getProfession(item: ChecklistItemPrimaryProfession, characterData: BattleNetCharacter): BattleNetCharacterProfession {
        return characterData.professions.primary.find(profession => profession.id === item.id);
    }
}
