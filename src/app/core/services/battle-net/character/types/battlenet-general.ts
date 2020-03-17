export interface BattleNetRef {
    id: number;
    key: BattleNetHref;
}

export interface BattleNetSelfRef {
    self: BattleNetHref;
}

export interface BattleNetHref {
    href: string;
}

export interface BattleNetNamedRef extends BattleNetRef {
    name: string;
}

export interface BattleNetRealmRef extends BattleNetNamedRef {
    slug: string;
}

export interface BattleNetCharacterRef extends BattleNetNamedRef {
    realm: BattleNetRealmRef;
}

export interface TypeName {
    type: string;
    name: string;
}
