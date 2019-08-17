import { Injectable, Injector, Type } from '@angular/core';
import { ChecklistRequestContainerService } from 'src/app/checklist/services/checklist-request-container.service';

import { CharacterStoreService } from '../../character-store/character-store.service';
import { ChecklistItem } from '../../checklist/checklist.interface';

import { ChecklistHandler } from './_handler';
import { ChecklistAchievementHandler } from './achievement-handler';
import { ChecklistEquipmentHandler } from './equpiment-level-handler';
import { ChecklistHeaderHandler } from './header-handler';
import { ChecklistLevelHandler } from './level-handler';
import { ChecklistManualHandler } from './manual-handler';
import { ChecklistPrimaryProfessionHandler } from './primary-profession-handler';
import { ChecklistQuestHandler } from './quest-handler';
import { ChecklistReputationHandler } from './reputation-handler';
import { ChecklistSecondaryProfessionHandler } from './secondary-profession-handler';

@Injectable({ providedIn: 'root' })
export class ChecklistHandlerService {
    private static readonly HANDLERS: { [ X in ChecklistItem['type'] ]: Type<ChecklistHandler<ChecklistItem>> } = {
        header: ChecklistHeaderHandler,
        achievement: ChecklistAchievementHandler,
        quest: ChecklistQuestHandler,
        reputation: ChecklistReputationHandler,
        'profession-primary': ChecklistPrimaryProfessionHandler,
        'profession-secondary': ChecklistSecondaryProfessionHandler,
        level: ChecklistLevelHandler,
        'item-level': ChecklistEquipmentHandler,
        manual: ChecklistManualHandler,
    };

    private handlerInjector: Injector;

    constructor(
        protected checklistRequestContainer: ChecklistRequestContainerService,
        protected characterStoreService: CharacterStoreService,
    ) { }

    getHandler(item: ChecklistItem, allItems: ChecklistItem[]): ChecklistHandler<ChecklistItem> {
        const handlerType = ChecklistHandlerService.HANDLERS[item.type];

        return new handlerType(this.checklistRequestContainer, this.characterStoreService, item, allItems);
    }
}
