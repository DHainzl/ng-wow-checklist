export interface BattleNetCharacter {
    achievementPoints: number;
    battlegroup: string;
    calcClass: string;
    class: number;
    faction: number;
    gender: number;
    lastModified: number;
    level: number;
    name: string;
    race: number;
    realm: string;
    thumbnail: string;
    totalHonorableKills: number;

    professions?: BattleNetCharacterProfessions;
    quests?: number[];
}

// tslint:disable-next-line:no-any
export type BattleNetCharacterItem = any;

export interface BattleNetCharacterProfessions {
    primary: BattleNetCharacterProfession[];
    secondary: BattleNetCharacterProfession[];
}

export interface BattleNetCharacterProfession {
    icon: string;
    id: number;
    max: number;
    name: string;
    rank: number;
    recipes: number[];
}
