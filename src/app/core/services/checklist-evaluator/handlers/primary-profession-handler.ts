import { Subscription } from 'rxjs';
import {
    ChecklistItem,
    ChecklistItemPrimaryProfession,
    ChecklistItemSecondaryProfession,
} from 'src/app/core/services/checklist/checklist.interface';
import { ChecklistRequestContainerService } from 'src/app/pages/checklist/services/checklist-request-container.service';

import {
    BattleNetProfession,
    BattleNetProfessions,
    BattleNetProfessionSkill,
    isTieredProfession,
} from '../../battle-net/character/types/battlenet-profession';
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

    private evaluate(professions: BattleNetProfessions): void {
        if (!professions) {
            this._completed$.next('loading');
            this._shown$.next(false);
            this._note$.next(undefined);
            return;
        }

        const profession = getProfession(professions.primaries, this.item);

        if (!profession) {
            this._shown$.next(false);
            return;
        }

        const isComplete = profession.skill_points >= profession.max_skill_points;

        this._shown$.next(true);
        this._note$.next({
            type: 'text',
            text: `${profession.skill_points} / ${profession.max_skill_points}`,
        });
        this._completed$.next(isComplete ? 'complete' : 'incomplete');
    }
}

export function getProfession(
    professions: BattleNetProfession[],
    item: ChecklistItemPrimaryProfession | ChecklistItemSecondaryProfession,
): BattleNetProfessionSkill {
    for (const profession of professions) {
        if (isTieredProfession(profession)) {
            const prof = profession.tiers.find(tier => tier.tier.id === item.id);
            if (prof) {
                return prof;
            }
        } else {
            if (profession.profession.id === item.id) {
                return profession;
            }
        }
    }

    return null;
}
