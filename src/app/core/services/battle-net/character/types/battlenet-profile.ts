import { BattleNetCharacterRef, BattleNetHref, BattleNetNamedRef, BattleNetSelfRef, TypeName } from './battlenet-general';

export interface BattleNetProfile {
    achievement_points: number;
    achievements: BattleNetHref;
    active_spec: BattleNetNamedRef;
    appearance: BattleNetHref;
    average_item_level: number;
    character_class: BattleNetNamedRef;
    collections: BattleNetHref;
    equipment: BattleNetHref;
    equipped_item_level: number;
    experience: number;
    faction: TypeName;
    gender: TypeName;
    guild: BattleNetCharacterRef;
    id: number;
    last_login_timestamp: number;
    level: number;
    media: BattleNetHref;
    mythic_keystone_profile: BattleNetHref;
    name: string;
    pvp_summary: BattleNetHref;
    race: BattleNetNamedRef;
    raid_progression: BattleNetHref;
    realm: BattleNetCharacterRef['realm'];
    specializations: BattleNetHref;
    statistics: BattleNetHref;
    titles: BattleNetHref;
    _self: BattleNetSelfRef;
}
