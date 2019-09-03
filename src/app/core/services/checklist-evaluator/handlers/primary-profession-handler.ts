import { Subscription } from 'rxjs';
import {
    BattleNetCharacterProfession,
    BattleNetCharacterProfessions,
} from 'src/app/core/services/battle-net/character/character.interface';
import { ChecklistItem, ChecklistItemPrimaryProfession } from 'src/app/core/services/checklist/checklist.interface';
import { ChecklistRequestContainerService } from 'src/app/pages/checklist/services/checklist-request-container.service';

import { CharacterStoreService } from '../../character-store/character-store.service';

import { ChecklistHandler } from './_handler';

export class ChecklistPrimaryProfessionHandler extends ChecklistHandler<ChecklistItemPrimaryProfession> {
    subscription: Subscription = new Subscription();

    constructor(
        protected checklistRequestContainer: ChecklistRequestContainerService,
        protected characterStoreService: CharacterStoreService,
        protected item: ChecklistItemPrimaryProfession,
        protected allItems: ChecklistItem[],
    ) {
        super(checklistRequestContainer, characterStoreService, item, allItems);
        this._shown$.next(false);
    }

    handlerInit(): void {
        this.subscription = this.checklistRequestContainer.professionsChanged.subscribe(professions => {
            this.evaluate(professions);
        });
    }

    handlerDestroy(): void {
        this.subscription.unsubscribe();
    }

    private evaluate(professions: BattleNetCharacterProfessions): void {
        if (!professions) {
            this._completed$.next('loading');
            this._shown$.next(false);
            this._note$.next(undefined);
            return;
        }

        const profession = this.getProfession(professions);

        if (!profession) {
            this._shown$.next(false);
            return;
        }

        const isComplete = profession.rank >= this.item.max;

        this._shown$.next(true);
        this._note$.next({
            type: 'text',
            text: `${profession.rank} / ${this.item.max}`,
        });
        this._completed$.next(isComplete ? 'complete' : 'incomplete');
    }

    private getProfession(professions: BattleNetCharacterProfessions): BattleNetCharacterProfession {
        return professions.primary.find(profession => profession.id === this.item.id);
    }
}
