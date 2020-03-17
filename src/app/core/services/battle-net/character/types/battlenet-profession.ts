import { BattleNetCharacterRef, BattleNetSelfRef } from './battlenet-general';

// TODO Not yet migrated; Update when the structure is known
export interface BattleNetProfessions {
    _links: BattleNetSelfRef;
    character: BattleNetCharacterRef;
}
