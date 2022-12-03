import { ChecklistHandler } from '../checklist-evaluator/handlers/_handler';

export type ChecklistCovenant = 'Kyrian' | 'Necrolord' | 'Night Fae' | 'Venthyr';
export type ChecklistWowClass = 'Death Knight' | 'Demon Hunter' | 'Druid' | 'Hunter' | 'Mage' | 'Monk' | 'Paladin' | 'Priest' |
    'Rogue' | 'Shaman' | 'Warlock' | 'Warrior';

export class Checklist {
    id: string;
    items: ChecklistItem[];
}

export interface ChecklistItemBase {
    key: string;
    name: string;
    type: 'header' | 'achievement' | 'quest' | 'reputation' | 'profession-primary' | 'profession-secondary' | 'level' | 'avg-item-level' |
        'manual' | 'item-level' | 'renown' | 'any-quest' | 'sanctum-talent' | 'sanctum-follower' | 'sanctum-follower-any' | 'sanctum-conduit' |
        'sanctum-missions-count' | 'sanctum-legendary' | 'reputation-renown';
    covenant?: ChecklistCovenant;
    classes?: ChecklistWowClass[];
    handler?: ChecklistHandler<ChecklistItem>;
}

export interface ChecklistItemHeader extends ChecklistItemBase {
    type: 'header';
    level: number;
}
export interface ChecklistItemAchievement extends ChecklistItemBase {
    id: number;
    type: 'achievement';
}
export interface ChecklistItemQuest extends ChecklistItemBase {
    id: number;
    type: 'quest';
}
export interface ChecklistItemAnyQuest extends ChecklistItemBase {
    type: 'any-quest';
    quests: {
        id: number;
        name: string;
    }[];
}
export interface ChecklistItemReputation extends ChecklistItemBase {
    id: number;
    type: 'reputation';
    max: number;
}
export interface ChecklistItemPrimaryProfession extends ChecklistItemBase {
    id: number;
    type: 'profession-primary';
}
export interface ChecklistItemSecondaryProfession extends ChecklistItemBase {
    id: number;
    type: 'profession-secondary';
}
export interface ChecklistItemLevel extends ChecklistItemBase {
    type: 'level';
    max: number;
}
export interface ChecklistItemAverageEquipmentLevel extends ChecklistItemBase {
    type: 'avg-item-level';
    max: number;
}
export interface ChecklistItemRenown extends ChecklistItemBase {
    type: 'renown';
    threshold: number;
}
export interface ChecklistItemReputationRenown extends ChecklistItemBase {
    type: 'reputation-renown';
    id: number;
    max: number;
}
export interface ChecklistItemManual extends ChecklistItemBase {
    type: 'manual';
}
export interface ChecklistItemEquipmentLevel extends ChecklistItemBase {
    type: 'item-level';
    slot: 'HEAD' | 'NECK' | 'SHOULDER' | 'SHIRT' | 'CHEST' | 'WAIST' | 'LEGS' | 'FEET' | 'WRIST' | 'HANDS' |
        'FINGER_1' | 'FINGER_2' | 'TRINKET_1' | 'TRINKET_2' | 'BACK' | 'MAIN_HAND' | 'OFF_HAND' | 'TABARD';
    level: number;
}
export interface ChecklistItemSanctumTalent extends ChecklistItemBase {
    type: 'sanctum-talent';
    talentName: 'transport' | 'conductor' | 'missions' | 'special';
}
export interface ChecklistItemSanctumFollower extends ChecklistItemBase {
    type: 'sanctum-follower';
}
export interface ChecklistItemSanctumFollowerAny extends ChecklistItemBase {
    type: 'sanctum-follower-any';
    followers: string[];
}
export interface ChecklistItemSanctumConduit extends ChecklistItemBase {
    type: 'sanctum-conduit';
    conduitId: number;
}
export interface ChecklistItemSanctumMissionsCount extends ChecklistItemBase {
    type: 'sanctum-missions-count';
}

export interface ChecklistItemSanctumLegendary extends ChecklistItemBase {
    type: 'sanctum-legendary';
}

export type ChecklistItem = ChecklistItemHeader | ChecklistItemAchievement | ChecklistItemQuest | ChecklistItemReputation |
    ChecklistItemPrimaryProfession | ChecklistItemSecondaryProfession | ChecklistItemLevel | ChecklistItemAverageEquipmentLevel |
    ChecklistItemManual | ChecklistItemEquipmentLevel | ChecklistItemRenown | ChecklistItemAnyQuest | ChecklistItemSanctumTalent |
    ChecklistItemSanctumFollower | ChecklistItemSanctumFollowerAny | ChecklistItemSanctumConduit | ChecklistItemSanctumMissionsCount |
    ChecklistItemSanctumLegendary | ChecklistItemReputationRenown;
