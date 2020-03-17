import { BattleNetCharacterRef, BattleNetNamedRef, BattleNetSelfRef } from './battlenet-general';

export interface BattleNetQuests {
    _links: BattleNetSelfRef;
    character: BattleNetCharacterRef;
    quests: BattleNetNamedRef[];
}
