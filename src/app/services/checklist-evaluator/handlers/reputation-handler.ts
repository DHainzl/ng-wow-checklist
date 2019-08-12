import { ChecklistHandler, ChecklistHandlerParams } from './_handler';
import { ChecklistItemReputation } from 'src/app/services/checklist/checklist.interface';
import { BattleNetCharacter, BattleNetCharacterReputation } from 'src/app/services/battle-net/character/character.interface';
import { CharacterInfo } from 'src/app/services/character-store/character-store.interface';

export class ChecklistReputationHandler extends ChecklistHandler<ChecklistItemReputation> {
    getHeader(data: ChecklistHandlerParams<ChecklistItemReputation>): string {
        const reputationNames = [ 'Hated', 'Hostile', 'Unfriendly', 'Neutral', 'Friendly', 'Honored', 'Revered', 'Exalted' ];
        const max = this.getMax(data.item, data.overrides);

        return `${data.item.name} / ${reputationNames[max]}`;
    }

    isShown(data: ChecklistHandlerParams<ChecklistItemReputation>): boolean {
        return true;
    }
    getNote(data: ChecklistHandlerParams<ChecklistItemReputation>): string {
        if (this.isCompleted(data)) {
            return '';
        }

        const reputation = this.getReputation(data.item, data.characterData);
        if (!reputation) {
            return '';
        }

        return `${reputation.value} / ${reputation.max}`;
    }

    isCompleted(data: ChecklistHandlerParams<ChecklistItemReputation>): boolean {
        const reputation = this.getReputation(data.item, data.characterData);
        if (!reputation) {
            return false;
        }

        return reputation.standing >= this.getMax(data.item, data.overrides);
    }

    private getReputation(item: ChecklistItemReputation, characterData: BattleNetCharacter): BattleNetCharacterReputation {
        return characterData.reputation.find(reputation => reputation.id === item.id);
    }

    private getMax(item: ChecklistItemReputation, overrides: CharacterInfo['overrides']): number {
        const override = overrides[item.key];

        if (override && override.type === 'reputation') {
            return override.max;
        }

        return item.max;
    }
}