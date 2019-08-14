export class Checklist {
    id: string;
    items: ChecklistItem[];
}

export interface ChecklistItemBase {
    id: number;
    key: string;
    name: string;
    type: 'header' | 'achievement' | 'quest' | 'reputation' | 'profession-primary' | 'profession-secondary' | 'level' | 'item-level';
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
    max: number;
}
export interface ChecklistItemSecondaryProfession extends ChecklistItemBase {
    type: 'profession-secondary';
    max: number;
}
export interface ChecklistItemLevel extends ChecklistItemBase {
    type: 'level';
    max: number;
}
export interface ChecklistItemEquipmentLevel extends ChecklistItemBase {
    type: 'item-level';
    max: number;
}

export type ChecklistItem = ChecklistItemHeader | ChecklistItemAchievement | ChecklistItemQuest | ChecklistItemReputation |
    ChecklistItemPrimaryProfession | ChecklistItemSecondaryProfession | ChecklistItemLevel | ChecklistItemEquipmentLevel;
