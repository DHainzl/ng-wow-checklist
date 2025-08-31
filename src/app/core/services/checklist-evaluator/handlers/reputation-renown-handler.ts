import { inject, Injectable } from '@angular/core';
import { BattleNetCharacterReputation } from '../../battle-net/character/types/battlenet-reputation';
import { ChecklistItemReputationRenown } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { CHECKLIST_REPUTATIONS, ChecklistHandler } from './_handler.service';

@Injectable()
export class ChecklistReputationRenownHandler extends ChecklistHandler<ChecklistItemReputationRenown> {
    private readonly reputations = inject(CHECKLIST_REPUTATIONS);

    evaluate(): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem();

        if (!this.reputations) {
            return {
                ...baseItem,
                completed: 'loading',
                note: undefined,
            };
        }

        const reputation = this.getReputation();
        const label = this.getLabel();

        if (!reputation) {
            return {
                ...baseItem,
                label,
                completed: 'incomplete',
            };
        }

        const isCompleted = (reputation.standing.renown_level ?? 0) >= this.item.max;

        if (isCompleted) {
            return {
                ...baseItem,
                label,
                completed: 'complete',
                note: undefined,
            };
        } else {
            return {
                ...baseItem,
                label,
                completed: 'incomplete',
                note: {
                    type: 'text',
                    text: `${reputation.standing.renown_level ?? 0} / ${this.item.max}`,
                },
            };
        }
    }

    private getLabel(): string {
        return `${this.item.name}: Renown ${this.item.max}`;
    }

    private getReputation(): BattleNetCharacterReputation | undefined {
        return this.reputations.reputations.find(reputation => reputation.faction.id === this.item.id);
    }
}
