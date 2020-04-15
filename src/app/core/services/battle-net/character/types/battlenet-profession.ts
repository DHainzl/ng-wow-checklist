import { BattleNetNamedRef, BattleNetSelfRef } from './battlenet-general';

export interface BattleNetProfessions {
    _links: BattleNetSelfRef;
    primaries: BattleNetProfession[];
    secondaries: BattleNetProfession[];
}

export interface BattleNetTieredProfession {
    profession: BattleNetNamedRef;
    tiers: BattleNetProfessionTier[];
}

export interface BattleNetProfessionSkill {
    skill_points: number;
    max_skill_points: number;
}

export interface BattleNetProfessionTier extends BattleNetProfessionSkill {
    tier: {
        id: number;
        name: string;
    };
    known_recipes: BattleNetNamedRef[];
}

export interface BattleNetUntieredProfession extends BattleNetProfessionSkill {
    profession: BattleNetNamedRef;
}

export type BattleNetProfession = BattleNetTieredProfession | BattleNetUntieredProfession;

export function isTieredProfession(profession: BattleNetProfession): profession is BattleNetTieredProfession {
    return typeof (<BattleNetTieredProfession> profession).tiers !== 'undefined';
}
