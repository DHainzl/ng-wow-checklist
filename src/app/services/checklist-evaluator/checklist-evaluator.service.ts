import { Injectable } from "@angular/core";
import { Checklist, ChecklistItemBase, ChecklistItem } from '../checklist/checklist.interface';
import { BattleNetCharacter } from '../battle-net/character/character.interface';
import { CharacterInfo } from '../character-store/character-store.interface';
import { EvaluatedChecklistItem } from './checklist-evaluator.interface';
import { ChecklistHeaderHandler } from './handlers/header-handler';
import { ChecklistAchievementHandler } from './handlers/achievement-handler';
import { ChecklistQuestHandler } from './handlers/quest-handler';
import { ChecklistReputationHandler } from './handlers/reputation-handler';
import { ChecklistPrimaryProfessionHandler } from './handlers/primary-profession-handler';
import { ChecklistSecondaryProfessionHandler } from './handlers/secondary-profession-handler';
import { ChecklistHandler, ChecklistHandlerParams } from './handlers/_handler';
import { ChecklistLevelHandler } from './handlers/level-handler';
import { ChecklistEquipmentHandler } from './handlers/equpiment-level-handler';

@Injectable({ providedIn: 'root' })
export class ChecklistEvaluatorService {
    private static readonly HANDLERS: { [ type in ChecklistItemBase['type'] ]: ChecklistHandler<ChecklistItem> } = {
        header: new ChecklistHeaderHandler(),
        achievement: new ChecklistAchievementHandler(),
        quest: new ChecklistQuestHandler(),
        reputation: new ChecklistReputationHandler(),
        'profession-primary': new ChecklistPrimaryProfessionHandler(),
        'profession-secondary': new ChecklistSecondaryProfessionHandler(),
        level: new ChecklistLevelHandler(),
        "item-level": new ChecklistEquipmentHandler(),
    }

    static getHandler(type: ChecklistItemBase['type']): ChecklistHandler<ChecklistItem> {
        return ChecklistEvaluatorService.HANDLERS[type];
    }

    evaluateChecklist(items: Checklist['items'], data: BattleNetCharacter, overrides: CharacterInfo['overrides']): EvaluatedChecklistItem[] {
        return items.map(item => {
            const handler = ChecklistEvaluatorService.getHandler(item.type);
            const handlerParams: ChecklistHandlerParams<ChecklistItem> = {
                item: item,
                characterData: data,
                overrides: overrides,
                checklist: items,
            }

            return {
                indention: this.getIndention(handlerParams),
                name: handler.getHeader(handlerParams),
                isShown: handler.isShown(handlerParams),
                note: handler.getNote(handlerParams),
                isCompleted: handler.isCompleted(handlerParams),
            };
        });
    }

    private getIndention(params: ChecklistHandlerParams<ChecklistItem>): number {
        if (params.item.type === 'header') {
            return params.item.level;
        }

        let lastIndention = 0;
        params.checklist.find(item => {
            if (item.type === 'header') {
                lastIndention = item.level;
            }

            return item.key === params.item.key;
        });
        return lastIndention + 1;
    }
}