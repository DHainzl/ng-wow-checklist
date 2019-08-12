import { Region } from '../battle-net/battle-net.interface';

export interface CharacterInfo {
    region: Region;
    realm: string;
    name: string;
    checklistId: string;
    overrides: { [ id: string ]: CharacterInfoOverride };
}


export interface CharacterInfoBaseOverride {
    type: 'reputation' | 'profession-secondary';
}
export interface CharacterInfoReputationOverride extends CharacterInfoBaseOverride {
    type: 'reputation',
    max: number;
}
export interface CharacterInfoSecondaryProfessionOverride extends CharacterInfoBaseOverride {
    type: 'profession-secondary';
    enabled: boolean;
}

export type CharacterInfoOverride = CharacterInfoReputationOverride | CharacterInfoSecondaryProfessionOverride;