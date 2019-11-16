export interface CharacterListEntry {
    name: string;
    realm: string;
    battlegroup: string;
    class: number;
    race: number;
    gender: number;
    level: number;
    achievementPoints: number;
    thumbnail: string;
    spec: CharacterListEntrySpec;
    lastModified: number;
}

export interface CharacterListEntrySpec {
    name: string;
    role: string;
    backgroundImage: string;
    icon: string;
    description: string;
    order: number;
}
