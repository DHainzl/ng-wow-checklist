import { inject, Injectable, Type } from '@angular/core';
import { CharacterStoreService } from '../../character-store/character-store.service';
import { ChecklistItem } from '../../checklist/checklist.interface';
import { ChecklistRequestContainerService } from '../checklist-request-container.service';
import { ChecklistHandler } from './_handler';
import { ChecklistAchievementHandler } from './achievement-handler';
import { ChecklistAnyQuestHandler } from './any-quest-handler';
import { ChecklistAverageEquipmentHandler } from './average-equipment-level-handler';
import { ChecklistEquipmentHandler } from './equipment-level-handler';
import { ChecklistHeaderHandler } from './header-handler';
import { ChecklistLevelHandler } from './level-handler';
import { ChecklistManualHandler } from './manual-handler';
import { ChecklistPrimaryProfessionHandler } from './primary-profession-handler';
import { ChecklistQuestHandler } from './quest-handler';
import { ChecklistRenownHandler } from './renown-handler';
import { ChecklistReputationHandler } from './reputation-handler';
import { ChecklistReputationRenownHandler } from './reputation-renown-handler';
import { ChecklistSanctumConduitHandler } from './sanctum-conduit-handler';
import { ChecklistSanctumFollowerAnyHandler } from './sanctum-follower-any-handler';
import { ChecklistSanctumFollowerHandler } from './sanctum-follower-handler';
import { ChecklistSanctumLegendaryHandler } from './sanctum-legendary.handler';
import { ChecklistSanctumMissionsCountHandler } from './sanctum-missions-count.handler';
import { ChecklistSanctumTalentHandler } from './sanctum-talent-handler';
import { ChecklistSecondaryProfessionHandler } from './secondary-profession-handler';

@Injectable({ providedIn: 'root' })
export class ChecklistHandlerService {
    protected readonly checklistRequestContainer = inject(ChecklistRequestContainerService);
    protected readonly characterStoreService = inject(CharacterStoreService);

    private static readonly HANDLERS: { [ X in ChecklistItem['type'] ]: Type<ChecklistHandler<ChecklistItem>> } = {
        header: ChecklistHeaderHandler,
        achievement: ChecklistAchievementHandler,
        quest: ChecklistQuestHandler,
        'any-quest': ChecklistAnyQuestHandler,
        reputation: ChecklistReputationHandler,
        'profession-primary': ChecklistPrimaryProfessionHandler,
        'profession-secondary': ChecklistSecondaryProfessionHandler,
        level: ChecklistLevelHandler,
        'avg-item-level': ChecklistAverageEquipmentHandler,
        manual: ChecklistManualHandler,
        'item-level': ChecklistEquipmentHandler,
        renown: ChecklistRenownHandler,
        'sanctum-talent': ChecklistSanctumTalentHandler,
        'sanctum-follower': ChecklistSanctumFollowerHandler,
        'sanctum-follower-any': ChecklistSanctumFollowerAnyHandler,
        'sanctum-conduit': ChecklistSanctumConduitHandler,
        'sanctum-missions-count': ChecklistSanctumMissionsCountHandler,
        'sanctum-legendary': ChecklistSanctumLegendaryHandler,
        'reputation-renown': ChecklistReputationRenownHandler,
    };

    getHandler(item: ChecklistItem, allItems: ChecklistItem[]): ChecklistHandler<ChecklistItem> {
        const handlerType = ChecklistHandlerService.HANDLERS[item.type];

        return new handlerType(this.checklistRequestContainer, this.characterStoreService, item, allItems);
    }
}
