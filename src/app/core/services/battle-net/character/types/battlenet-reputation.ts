import { BattleNetCharacterRef, BattleNetNamedRef, BattleNetSelfRef } from './battlenet-general';

export interface BattleNetCharacterReputations {
    reputations: BattleNetCharacterReputation[];
    character: BattleNetCharacterRef;
    _links: BattleNetSelfRef;
}

export interface BattleNetCharacterReputation {
    faction: BattleNetNamedRef;
    standing: BattleNetCharacterReputationStanding;
    paragon: BattleNetCharacterReputationParagon;
}

export interface BattleNetCharacterReputationStanding {
    name: string;
    value: number;
    max: number;
    tier: number;
    raw: number;
}

export interface BattleNetCharacterReputationParagon {
    raw: number;
    value: number;
    max: number;
}
