import { BattleNetSelfRef } from "../battle-net/character/types/battlenet-general";

export interface ReputationTierList {
    _links: BattleNetSelfRef;
    id: number;
    tiers: ReputationTier[];
}

export interface ReputationTier {
    name: string;
    min_value: number;
    max_value: number;
    id: number;
}