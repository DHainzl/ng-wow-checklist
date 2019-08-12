import { ChecklistHandler, ChecklistHandlerParams } from './_handler';
import { ChecklistItemPrimaryProfession } from 'src/app/services/checklist/checklist.interface';
import { BattleNetCharacter, BattleNetCharacterProfession } from 'src/app/services/battle-net/character/character.interface';

export class ChecklistPrimaryProfessionHandler extends ChecklistHandler<ChecklistItemPrimaryProfession> {
    isShown(data: ChecklistHandlerParams<ChecklistItemPrimaryProfession>): boolean {
        return !!this.getProfession(data.item, data.characterData);
    }
    getNote(data: ChecklistHandlerParams<ChecklistItemPrimaryProfession>): string {
        const profession = this.getProfession(data.item, data.characterData);
        if (!profession) {
            return '';
        }

        return `${profession.rank} / ${data.item.max}`;
    }
    isCompleted(data: ChecklistHandlerParams<ChecklistItemPrimaryProfession>): boolean {
        const profession = this.getProfession(data.item, data.characterData);
        if (!profession) {
            return false;
        }

        return profession.rank >= data.item.max;
    }

    private getProfession(item: ChecklistItemPrimaryProfession, characterData: BattleNetCharacter): BattleNetCharacterProfession {
        return characterData.professions.primary.find(profession => profession.id === item.id);
    }
}