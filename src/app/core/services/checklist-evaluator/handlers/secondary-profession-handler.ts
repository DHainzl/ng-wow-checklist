import { combineLatest, Subscription } from 'rxjs';
import { BattleNetProfessions } from '../../battle-net/character/types/battlenet-profession';

import { CharacterInfo } from '../../character-store/character-store.interface';
import { ChecklistItemSecondaryProfession } from '../../checklist/checklist.interface';
import { ChecklistHandler } from './_handler';
import { getProfession } from './primary-profession-handler';

export class ChecklistSecondaryProfessionHandler extends ChecklistHandler<ChecklistItemSecondaryProfession> {
    subscription: Subscription = new Subscription();

    handlerInit(): void {
        this.subscription = combineLatest([
            this.checklistRequestContainer.professionsChanged,
            this.checklistRequestContainer.overridesChanged,
        ]).subscribe(([ professions, overrides ]) => {
            this.evaluate(professions, overrides);
        });
    }

    handlerDestroy(): void {
        this.subscription.unsubscribe();
    }

    private evaluate(professions: BattleNetProfessions | undefined, overrides: CharacterInfo['overrides'] | undefined): void {
        if (!professions || !professions.secondaries || !overrides) {
            this._shown$.next(false);
            this._note$.next(undefined);
            this._completed$.next('loading');
            return;
        }

        const profession = getProfession(professions.secondaries, this.item);
        const isEnabled = this.isEnabled(overrides);

        if (!profession || !isEnabled) {
            this._shown$.next(false);
            return;
        }

        const isCompleted = profession.skill_points >= profession.max_skill_points;

        this._shown$.next(true);
        this._note$.next({
            type: 'text',
            text: `${profession.skill_points} / ${profession.max_skill_points}`,
        });
        this._completed$.next(isCompleted ? 'complete' : 'incomplete');
    }

    private isEnabled(overrides: CharacterInfo['overrides']): boolean {
        const override = overrides[this.item.key];

        if (override && override.type === 'profession-secondary') {
            return override.enabled;
        }

        return false;
    }
}
