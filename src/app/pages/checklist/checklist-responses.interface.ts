import { BattleNetAchievements } from "../../core/services/battle-net/character/types/battlenet-achievement";
import { BattleNetEquipment } from "../../core/services/battle-net/character/types/battlenet-equipment";
import { BattleNetMedia } from "../../core/services/battle-net/character/types/battlenet-media";
import { BattleNetProfessions } from "../../core/services/battle-net/character/types/battlenet-profession";
import { BattleNetProfile } from "../../core/services/battle-net/character/types/battlenet-profile";
import { BattleNetQuests } from "../../core/services/battle-net/character/types/battlenet-quest";
import { BattleNetCharacterReputations } from "../../core/services/battle-net/character/types/battlenet-reputation";
import { CharacterInfo, CharacterIngameData } from "../../core/services/character-store/character-store.interface";
import { Checklist } from "../../core/services/checklist/checklist.interface";

export interface ChecklistResponses {
    quests: BattleNetQuests | undefined;
    professions: BattleNetProfessions | undefined;
    reputations: BattleNetCharacterReputations | undefined;
    achievements: BattleNetAchievements | undefined;
    equipment: BattleNetEquipment | undefined;
    media: BattleNetMedia | undefined;
    profile: BattleNetProfile | undefined;
    characterInfo: CharacterInfo | undefined;
    ingameData: CharacterIngameData | undefined;
    checklist: Checklist | undefined;
}
