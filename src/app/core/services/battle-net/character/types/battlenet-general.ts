export interface BattleNetRef {
    id: number;
    key: {
        href: string;
    };
}

export interface BattleNetSelfRef {
    self: {
        href: string;
    };
}

export interface BattleNetNamedRef extends BattleNetRef {
    name: string;
}

export interface BattleNetCharacterRef extends BattleNetNamedRef {
    realm: {
        id: number;
        key: {
            href: string;
        },
        name: string;
        slug: string;
    };
}

export interface TypeName {
    type: string;
    name: string;
}
