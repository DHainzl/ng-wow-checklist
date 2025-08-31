import { Observable } from 'rxjs';
import { BattleNetAchievements } from '../../battle-net/character/types/battlenet-achievement';
import { BattleNetEquipment } from '../../battle-net/character/types/battlenet-equipment';
import { BattleNetMedia } from '../../battle-net/character/types/battlenet-media';
import { BattleNetProfessions } from '../../battle-net/character/types/battlenet-profession';
import { BattleNetProfile } from '../../battle-net/character/types/battlenet-profile';
import { BattleNetQuests } from '../../battle-net/character/types/battlenet-quest';
import { BattleNetCharacterReputations } from '../../battle-net/character/types/battlenet-reputation';
import { CharacterInfo, CharacterIngameData } from '../../character-store/character-store.interface';
import { ChecklistItem } from '../../checklist/checklist.interface';

export type CompletionStatus = 'loading' | 'complete' | 'incomplete';

export interface ChecklistNoteBase {
    type: 'text' | 'button';
}

export interface ChecklistNoteText extends ChecklistNoteBase {
    type: 'text';
    text: string;
}

export interface ChecklistNoteButton extends ChecklistNoteBase {
    type: 'button';
    label: string;
    onClick: () => Observable<undefined>;
}

export type ChecklistNote = ChecklistNoteText | ChecklistNoteButton;

export interface ChecklistEvaluatorData {
    quests: BattleNetQuests,
    professions: BattleNetProfessions,
    reputations: BattleNetCharacterReputations,
    achievements: BattleNetAchievements,
    equipment: BattleNetEquipment,
    media: BattleNetMedia,
    profile: BattleNetProfile,
    characterInfo: CharacterInfo,
    ingameData: CharacterIngameData,
    allItems: ChecklistItem[],
}