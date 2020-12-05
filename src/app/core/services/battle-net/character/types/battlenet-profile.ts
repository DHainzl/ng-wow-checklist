import { BattleNetCharacterRef, BattleNetHref, BattleNetNamedRef, BattleNetSelfRef, TypeName } from './battlenet-general';

export interface BattleNetProfile {
    _links: BattleNetSelfRef;
    id: number;
    name: string;
    gender: TypeName;
    faction: TypeName;
    race: BattleNetNamedRef;
    character_class: BattleNetNamedRef;
    active_spec: BattleNetNamedRef;
    realm: BattleNetCharacterRef['realm'];
    guild: BattleNetCharacterRef;
    level: number;
    experience: number;
    achievement_points: number;
    achievements: BattleNetHref;
    titles: BattleNetHref;
    pvp_summary: BattleNetHref;
    encounters: BattleNetHref;
    media: BattleNetHref;
    last_login_timestamp: number;
    average_item_level: number;
    equipped_item_level: number;
    specializations: BattleNetHref;
    statistics: BattleNetHref;
    mythic_keystone_profile: BattleNetHref;
    equipment: BattleNetHref;
    appearance: BattleNetHref;
    collections: BattleNetHref;
    active_title?: BattleNetProfileTitle;
    reputations: BattleNetHref;
    quests: BattleNetHref;
    achievements_statistics: BattleNetHref;
    professions: BattleNetHref;
    covenant_progress?: BattleNetProfileCovenant;
}

export interface BattleNetProfileTitle extends BattleNetNamedRef {
    display_string: string;
}

export interface BattleNetProfileCovenant {
    chosen_covenant: BattleNetNamedRef;
    renown_level: number;
    soulbinds: BattleNetHref;
}
