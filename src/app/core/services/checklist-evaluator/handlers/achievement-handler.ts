import { combineLatest, Subscription } from 'rxjs';
import { ChecklistItemAchievement } from 'src/app/core/services/checklist/checklist.interface';

import { BattleNetAchievement, BattleNetAchievements } from '../../battle-net/character/types/battlenet-achievement';
import { BattleNetProfile } from '../../battle-net/character/types/battlenet-profile';

import { ChecklistHandler } from './_handler';

export class ChecklistAchievementHandler extends ChecklistHandler<ChecklistItemAchievement> {
    subscription: Subscription = new Subscription();

    handlerInit(): void {
        this.subscription = combineLatest(
            this.checklistRequestContainer.achievementsChanged,
            this.checklistRequestContainer.profileChanged,
        ).subscribe(([ achievements, profile ]) => {
            this.evaluate(achievements, profile);
        });
    }

    handlerDestroy(): void {
        this.subscription.unsubscribe();
    }

    private evaluate(achievements: BattleNetAchievements, profile: BattleNetProfile): void {
        if (!achievements || !profile) {
            this._completed$.next('loading');
            return;
        }

        const achievement = this.getAchievement(achievements);

        if (!achievement || !achievement.criteria.is_completed) {
            this._completed$.next('incomplete');
        } else {
            this._completed$.next('complete');
        }

        this._wowheadId$.next(this.getWowheadId(achievement, profile));
    }

    getWowheadId(achievement: BattleNetAchievement, profile: BattleNetProfile): string {
        let link = `${this.item.type}-${this.item.id}`;

        if (!achievement) {
            return link;
        }

        if (achievement.criteria.is_completed) {
            link += `?who=${profile.name}&when=${achievement.completed_timestamp}`;
        }

        return link;
    }

    private getAchievement(achievements: BattleNetAchievements): BattleNetAchievement {
        return achievements.achievements.find(av => av.id === this.item.id);
    }
}
