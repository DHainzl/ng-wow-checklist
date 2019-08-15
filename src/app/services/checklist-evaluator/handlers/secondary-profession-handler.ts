import { BattleNetCharacter, BattleNetCharacterProfession } from 'src/app/services/battle-net/character/character.interface';
import { CharacterInfo } from 'src/app/services/character-store/character-store.interface';
import { ChecklistItemSecondaryProfession } from 'src/app/services/checklist/checklist.interface';

import { ChecklistHandler, ChecklistHandlerParams } from './_handler';

export class ChecklistSecondaryProfessionHandler extends ChecklistHandler<ChecklistItemSecondaryProfession> {
    isShown(data: ChecklistHandlerParams<ChecklistItemSecondaryProfession>): boolean {
        return !!this.getProfession(data.item, data.characterData.mainCharacter) && this.isOverridden(data.item, data.overrides);
    }
    getNote(data: ChecklistHandlerParams<ChecklistItemSecondaryProfession>): string {
        const profession = this.getProfession(data.item, data.characterData.mainCharacter);
        if (!profession) {
            return '';
        }

        return `${profession.rank} / ${data.item.max}`;
    }
    isCompleted(data: ChecklistHandlerParams<ChecklistItemSecondaryProfession>): boolean {
        const profession = this.getProfession(data.item, data.characterData.mainCharacter);
        if (!profession) {
            return false;
        }

        return profession.rank >= data.item.max;
    }

    private getProfession(item: ChecklistItemSecondaryProfession, characterData: BattleNetCharacter): BattleNetCharacterProfession {
        return characterData.professions.secondary.find(profession => profession.id === item.id);
    }

    private isOverridden(item: ChecklistItemSecondaryProfession, overrides: CharacterInfo['overrides']): boolean {
        const override = overrides[item.key];

        if (override && override.type === 'profession-secondary') {
            return override.enabled;
        }

        return false;
    }
}
