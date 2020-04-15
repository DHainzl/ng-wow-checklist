import { ChecklistHandler } from '../checklist-evaluator/handlers/_handler';

export class Checklist {
    id: string;
    items: ChecklistItem[];
}

export interface ChecklistItemBase {
    id: number;
    key: string;
    name: string;
    type: 'header' | 'achievement' | 'quest' | 'reputation' | 'profession-primary' | 'profession-secondary' | 'level' | 'avg-item-level' |
        'manual' | 'item-level';
    handler?: ChecklistHandler<ChecklistItem>;
}

export interface ChecklistItemHeader extends ChecklistItemBase {
    type: 'header';
    level: number;
}
export interface ChecklistItemAchievement extends ChecklistItemBase {
    type: 'achievement';
}
export interface ChecklistItemQuest extends ChecklistItemBase {
    type: 'quest';
}
export interface ChecklistItemReputation extends ChecklistItemBase {
    type: 'reputation';
    max: number;
}
export interface ChecklistItemPrimaryProfession extends ChecklistItemBase {
    type: 'profession-primary';
}
export interface ChecklistItemSecondaryProfession extends ChecklistItemBase {
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
export interface ChecklistItemManual extends ChecklistItemBase {
    type: 'manual';
}
export interface ChecklistItemEquipmentLevel extends ChecklistItemBase {
    type: 'item-level';
    slot: 'HEAD' | 'NECK' | 'SHOULDER' | 'SHIRT' | 'CHEST' | 'WAIST' | 'LEGS' | 'FEET' | 'WRIST' | 'HANDS' |
        'FINGER_1' | 'FINGER_2' | 'TRINKET_1' | 'TRINKET_2' | 'BACK' | 'MAIN_HAND' | 'OFF_HAND' | 'TABARD';
    level: number;
}

export type ChecklistItem = ChecklistItemHeader | ChecklistItemAchievement | ChecklistItemQuest | ChecklistItemReputation |
    ChecklistItemPrimaryProfession | ChecklistItemSecondaryProfession | ChecklistItemLevel | ChecklistItemAverageEquipmentLevel |
    ChecklistItemManual | ChecklistItemEquipmentLevel;
