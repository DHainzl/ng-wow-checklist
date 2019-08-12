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

    achievements?: BattleNetCharacterAchievements;
    items?: BattleNetCharacterItems;
    professions?: BattleNetCharacterProfessions;
    quests: number[];
    reputation: BattleNetCharacterReputation[];
};

export interface BattleNetCharacterAchievements {
    achievementsCompleted: number[];
    achievementsCompletedTimestamp: number[];
    criteria: number[];
    criteriaCreated: number[];
    criteriaQuantity: number[];
    criteriaTimestamp: number[];
}

export interface BattleNetCharacterItems {
    averageItemLevel: number;
    averageItemLevelEquipped: number;
    back: BattleNetCharacterItem;
    chest: BattleNetCharacterItem;
    feet: BattleNetCharacterItem;
    finger1: BattleNetCharacterItem;
    finger2: BattleNetCharacterItem;
    hands: BattleNetCharacterItem;
    head: BattleNetCharacterItem;
    legs: BattleNetCharacterItem;
    mainHand: BattleNetCharacterItem;
    offHand: BattleNetCharacterItem;
    nerck: BattleNetCharacterItem;
    shirt: BattleNetCharacterItem;
    shoulder: BattleNetCharacterItem;
    tabard: BattleNetCharacterItem;
    trinket1: BattleNetCharacterItem;
    trinket2: BattleNetCharacterItem;
    waist: BattleNetCharacterItem;
    wrist: BattleNetCharacterItem;   
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

export interface BattleNetCharacterReputation {
    id: number;
    max: number;
    name: string;
    standing: number;
    value: number;
}