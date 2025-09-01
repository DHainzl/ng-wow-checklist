import { EnvironmentInjector, inject, Injectable, Injector, Provider, runInInjectionContext, StaticProvider } from "@angular/core";
import { ChecklistResponses } from "../../../pages/checklist/checklist-responses.interface";
import { BattleNetProfile } from "../battle-net/character/types/battlenet-profile";
import { ChecklistItem } from "../checklist/checklist.interface";
import { CHECKLIST_ACHIEVEMENTS, CHECKLIST_CHARACTERINFO, CHECKLIST_EQUIPMENT, CHECKLIST_INGAMEDATA, CHECKLIST_ITEM, CHECKLIST_MEDIA, CHECKLIST_PROFESSIONS, CHECKLIST_PROFILE, CHECKLIST_QUESTS, CHECKLIST_REPUTATIONS, ChecklistHandler } from "./handlers/_handler.service";
import { ChecklistAchievementHandler } from "./handlers/achievement-handler";
import { ChecklistAnyQuestHandler } from "./handlers/any-quest-handler";
import { ChecklistAverageEquipmentHandler } from "./handlers/average-equipment-level-handler";
import { ChecklistEquipmentHandler } from "./handlers/equipment-level-handler";
import { ChecklistHeaderHandler } from "./handlers/header-handler";
import { ChecklistLevelHandler } from "./handlers/level-handler";
import { ChecklistManualHandler } from "./handlers/manual-handler";
import { ChecklistPrimaryProfessionHandler } from "./handlers/primary-profession-handler";
import { ChecklistQuestHandler } from "./handlers/quest-handler";
import { ChecklistRenownHandler } from "./handlers/renown-handler";
import { ChecklistReputationHandler } from "./handlers/reputation-handler";
import { ChecklistReputationRenownHandler } from "./handlers/reputation-renown-handler";
import { ChecklistSanctumConduitHandler } from "./handlers/sanctum-conduit-handler";
import { ChecklistSanctumFollowerAnyHandler } from "./handlers/sanctum-follower-any-handler";
import { ChecklistSanctumFollowerHandler } from "./handlers/sanctum-follower-handler";
import { ChecklistSanctumLegendaryHandler } from "./handlers/sanctum-legendary.handler";
import { ChecklistSanctumMissionsCountHandler } from "./handlers/sanctum-missions-count.handler";
import { ChecklistSanctumTalentHandler } from "./handlers/sanctum-talent-handler";
import { ChecklistSecondaryProfessionHandler } from "./handlers/secondary-profession-handler";

@Injectable({ providedIn: 'root' })
export class ChecklistEvaluatorService {
    private readonly environmentInjector = inject(EnvironmentInjector);

    private readonly handlerProviders: Array<Provider | StaticProvider> = [
        ChecklistHeaderHandler,
        ChecklistAchievementHandler,
        ChecklistQuestHandler,
        ChecklistAnyQuestHandler,
        ChecklistReputationHandler,
        ChecklistPrimaryProfessionHandler,
        ChecklistSecondaryProfessionHandler,
        ChecklistLevelHandler,
        ChecklistAverageEquipmentHandler,
        ChecklistManualHandler,
        ChecklistEquipmentHandler,
        ChecklistRenownHandler,
        ChecklistSanctumTalentHandler,
        ChecklistSanctumFollowerHandler,
        ChecklistSanctumFollowerAnyHandler,
        ChecklistSanctumConduitHandler,
        ChecklistSanctumMissionsCountHandler,
        ChecklistSanctumLegendaryHandler,
        ChecklistReputationRenownHandler,
    ];

    private readonly HANDLERS: { [ X in ChecklistItem['type'] ]: typeof ChecklistHandler<ChecklistItem> } = {
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

    buildTree(items: ChecklistItem[]): ChecklistItem[] {
        const tree: ChecklistItem[] = [];
        const itemsCopy = [...items];

        var currentItem: ChecklistItem | undefined;

        while (currentItem = itemsCopy.shift()) {
            if (currentItem.type === 'header') {
                const currentLevel = currentItem.level;
                const nextIndex = itemsCopy.findIndex(item => item.type === 'header' && item.level <= currentLevel);
                const subitems = nextIndex === -1 ? itemsCopy.splice(0) : itemsCopy.splice(0, nextIndex);

                tree.push({
                    ...currentItem,
                    subitems: this.buildTree(subitems),
                })
            } else {
                tree.push(currentItem);
            }
        }

        return tree;
    }

    getHandler(item: ChecklistItem, responses: ChecklistResponses): ChecklistHandler<ChecklistItem> {
        if (!this.HANDLERS[item.type]) {
            throw new Error('Could not find handler for checklist item! ' + item.type);
        }

        const injector = Injector.create({
            providers: [
                ...this.handlerProviders,

                { provide: CHECKLIST_ITEM, useValue: item },
                { provide: CHECKLIST_QUESTS, useValue: responses.quests },
                { provide: CHECKLIST_PROFESSIONS, useValue: responses.professions },
                { provide: CHECKLIST_REPUTATIONS, useValue: responses.reputations },
                { provide: CHECKLIST_ACHIEVEMENTS, useValue: responses.achievements },
                { provide: CHECKLIST_EQUIPMENT, useValue: responses.equipment },
                { provide: CHECKLIST_MEDIA, useValue: responses.media },
                { provide: CHECKLIST_PROFILE, useValue: responses.profile },
                { provide: CHECKLIST_CHARACTERINFO, useValue: responses.characterInfo },
                { provide: CHECKLIST_INGAMEDATA, useValue: responses.ingameData },
            ],
            parent: this.environmentInjector,
        });

        const handler = runInInjectionContext(injector, () => {
            return inject(this.HANDLERS[item.type]);
        });

        return handler;
    }

    private isInRightCovenant(item: ChecklistItem, profile: BattleNetProfile): boolean {
        if (!item.covenant) {
            return true;
        }

        if (!profile) {
            return false;
        }

        return item.covenant === profile.covenant_progress?.chosen_covenant?.name;
    }

    private isRightClass(item: ChecklistItem, profile: BattleNetProfile): boolean {
        if (!item.classes?.length) {
            return true;
        }

        if (!profile) {
            return false;
        }

        return !!item.classes.find(cls => profile.character_class.name === cls);
    }
}
