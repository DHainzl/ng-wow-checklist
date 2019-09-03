import { BattleNetCharacterRef, BattleNetNamedRef, BattleNetSelfRef } from './battlenet-general';

export interface BattleNetAchievements {
    achievements: BattleNetAchievement[];
    category_progress: BattleNetAchievementCategoryProgress[];
    character: BattleNetCharacterRef;
    recent_events: {
        achievement: BattleNetNamedRef;
        timestamp: number;
    }[];
    total_points: number;
    total_quantity: number;
    _links: BattleNetSelfRef;
}

export interface BattleNetAchievement {
    id: number;
    achievement: BattleNetNamedRef;
    criteria: BattleNetAchievementCriteria;
    completed_timestamp?: number;
}

export interface BattleNetAchievementCriteria {
    id: number;
    is_completed: boolean;
    child_criteria?: {
        id: number;
        amount: number;
        is_completed: boolean;
    }[];
}

export interface BattleNetAchievementCategoryProgress {
    category: BattleNetNamedRef;
    points: number;
    quantity: number;
}
