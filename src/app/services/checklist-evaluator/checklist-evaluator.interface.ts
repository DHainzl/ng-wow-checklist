import { BattleNetCharacter } from '../battle-net/character/character.interface';
import { BattleNetAchievements } from '../battle-net/character/types/battlenet-achievement';
import { BattleNetEquipment } from '../battle-net/character/types/battlenet-equipment';
import { BattleNetMedia } from '../battle-net/character/types/battlenet-media';
import { BattleNetProfile } from '../battle-net/character/types/battlenet-profile';

export interface AllCharacterData {
    mainCharacter: BattleNetCharacter;
    achievements: BattleNetAchievements;
    equipment: BattleNetEquipment;
    media: BattleNetMedia;
    profile: BattleNetProfile;
}

export class EvaluatedChecklistItem {
    indention: number;
    name: string;
    isShown: boolean;
    note: string;
    isCompleted: boolean;
    wowheadId: string;
    subitems: string[];
}
