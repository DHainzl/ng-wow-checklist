import { BattleNetCharacterRef, BattleNetSelfRef } from './battlenet-general';

export interface BattleNetMedia {
    _links: BattleNetSelfRef;
    character: BattleNetCharacterRef;
    assets: BattleNetMediaAsset[];
}

export interface BattleNetMediaAsset {
    key: string;
    value: string;
}
