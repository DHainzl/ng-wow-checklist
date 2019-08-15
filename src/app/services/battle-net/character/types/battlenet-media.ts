import { BattleNetCharacterRef, BattleNetSelfRef } from './battlenet-general';

export interface BattleNetMedia {
    avatar_url: string;
    bust_url: string;
    character: BattleNetCharacterRef;
    render_url: string;
    _links: BattleNetSelfRef;
}
