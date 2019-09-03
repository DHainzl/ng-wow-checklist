import { combineLatest, Subscription } from 'rxjs';
import {
    BattleNetCharacterProfession,
    BattleNetCharacterProfessions,
 } from 'src/app/core/services/battle-net/character/character.interface';
import { CharacterInfo } from 'src/app/core/services/character-store/character-store.interface';
import { ChecklistItemSecondaryProfession } from 'src/app/core/services/checklist/checklist.interface';

import { ChecklistHandler } from './_handler';

export class ChecklistSecondaryProfessionHandler extends ChecklistHandler<ChecklistItemSecondaryProfession> {
    subscription: Subscription = new Subscription();

    handlerInit(): void {
        this.subscription = combineLatest(
            this.checklistRequestContainer.professionsChanged,
            this.checklistRequestContainer.overridesChanged,
        ).subscribe(([ professions, overrides ]) => {
            this.evaluate(professions, overrides);
        });
    }

    handlerDestroy(): void {
        this.subscription.unsubscribe();
    }

    private evaluate(professions: BattleNetCharacterProfessions, overrides: CharacterInfo['overrides']): void {
        if (!professions || !overrides) {
            this._shown$.next(false);
            this._note$.next(undefined);
            this._completed$.next('loading');
            return;
        }

        const profession = this.getProfession(professions);
        const isEnabled = this.isEnabled(overrides);

        if (!profession || !isEnabled) {
            this._shown$.next(false);
            return;
        }

        const isCompleted = profession.rank >= this.item.max;

        this._shown$.next(true);
        this._note$.next({
            type: 'text',
            text: `${profession.rank} / ${this.item.max}`,
        });
        this._completed$.next(isCompleted ? 'complete' : 'incomplete');
    }

    private getProfession(professions: BattleNetCharacterProfessions): BattleNetCharacterProfession {
        return professions.secondary.find(profession => profession.id === this.item.id);
    }

    private isEnabled(overrides: CharacterInfo['overrides']): boolean {
        const override = overrides[this.item.key];

        if (override && override.type === 'profession-secondary') {
            return override.enabled;
        }

        return false;
    }
}
