import { BattleNetHref, BattleNetNamedRef, BattleNetRealmRef, BattleNetSelfRef, TypeName } from '../../character/types/battlenet-general';

export interface BattleNetCharacterList {
    _links: BattleNetCharacterListLinks;
    id: number;
    collections: BattleNetHref;
    wow_accounts: BattleNetWowAccount[];
}

export interface BattleNetCharacterListLinks extends BattleNetSelfRef {
    user: BattleNetHref;
    profile: BattleNetHref;
}

export interface BattleNetWowAccount {
    id: number;
    characters: BattleNetCharacterListEntry[];
}

export interface BattleNetCharacterListEntry {
    character: BattleNetHref;
    protected_character: BattleNetHref;
    name: string;
    id: number;
    realm: BattleNetRealmRef;
    playable_class: BattleNetNamedRef;
    playable_race: BattleNetNamedRef;
    gender: TypeName;
    faction: TypeName;
    level: number;
}
