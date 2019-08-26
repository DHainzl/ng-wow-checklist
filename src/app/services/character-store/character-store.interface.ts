import { Region } from '../battle-net/battle-net.interface';

export interface CharacterInfo {
    region: Region;
    realm: string;
    name: string;
    checklistId: string;
    overrides: { [ id: string ]: CharacterInfoOverride };
}

export interface CharacterInfoBaseOverride {
    type: 'reputation' | 'profession-secondary' | 'manual';
}
export interface CharacterInfoReputationOverride extends CharacterInfoBaseOverride {
    type: 'reputation';
    max: number;
}
export interface CharacterInfoSecondaryProfessionOverride extends CharacterInfoBaseOverride {
    type: 'profession-secondary';
    enabled: boolean;
}
export interface CharacterInfoManualOverride extends CharacterInfoBaseOverride {
    type: 'manual';
    checked: boolean;
}

export type CharacterInfoOverride = CharacterInfoReputationOverride | CharacterInfoSecondaryProfessionOverride |
    CharacterInfoManualOverride;
