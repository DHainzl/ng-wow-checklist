import { EnvironmentInjector, inject, Injectable, Injector, Provider, runInInjectionContext, StaticProvider } from "@angular/core";
import { BattleNetProfile } from "../battle-net/character/types/battlenet-profile";
import { Checklist, ChecklistItem } from "../checklist/checklist.interface";
import { EvaluatedChecklistItem } from "./evaluated-checklist-item.interface";
import { ChecklistEvaluatorData } from "./handlers/_handler.interface";
import { CHECKLIST_ACHIEVEMENTS, CHECKLIST_ALL_ITEMS, CHECKLIST_CHARACTERINFO, CHECKLIST_EQUIPMENT, CHECKLIST_EVALUATED_ITEMS, CHECKLIST_INGAMEDATA, CHECKLIST_ITEM, CHECKLIST_MEDIA, CHECKLIST_PROFESSIONS, CHECKLIST_PROFILE, CHECKLIST_QUESTS, CHECKLIST_REPUTATIONS, ChecklistHandler } from "./handlers/_handler.service";
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

    evaluate(checklist: Checklist, data: ChecklistEvaluatorData): EvaluatedChecklistItem[] {
        const items = checklist.items
            .filter(item => this.isInRightCovenant(item, data.profile))
            .filter(item => this.isRightClass(item, data.profile));

        const evaluated: EvaluatedChecklistItem[] = [];

        // Go through them bottom-to-top so we can evaluate the headers when we reach them
        items.reverse()
            .forEach(item => evaluated.unshift(this.evaluateItem(item, evaluated, data)));

        return evaluated;
    }

    private evaluateItem(item: ChecklistItem, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem {
        if (this.HANDLERS[item.type]) {
            const injector = Injector.create({
                providers: [
                    ...this.handlerProviders,

                    { provide: CHECKLIST_ITEM, useValue: item },
                    { provide: CHECKLIST_EVALUATED_ITEMS, useValue: evaluated },
                    { provide: CHECKLIST_ALL_ITEMS, useValue: data.allItems },
                    { provide: CHECKLIST_QUESTS, useValue: data.quests },
                    { provide: CHECKLIST_PROFESSIONS, useValue: data.professions },
                    { provide: CHECKLIST_REPUTATIONS, useValue: data.reputations },
                    { provide: CHECKLIST_ACHIEVEMENTS, useValue: data.achievements },
                    { provide: CHECKLIST_EQUIPMENT, useValue: data.equipment },
                    { provide: CHECKLIST_MEDIA, useValue: data.media },
                    { provide: CHECKLIST_PROFILE, useValue: data.profile },
                    { provide: CHECKLIST_CHARACTERINFO, useValue: data.characterInfo },
                    { provide: CHECKLIST_INGAMEDATA, useValue: data.ingameData },
                ],
                parent: this.environmentInjector,
            });

            const handler = runInInjectionContext(injector, () => {
                return inject(this.HANDLERS[item.type]);
            });

            return handler.evaluate();
        }

        console.warn('Could not find handler for checklist item!', item.type, item.name);

        return {
            completed: 'loading',
            indention: 0,
            label: item.name,
            note: undefined,
            shown: true,
            subitems: [],
            wowheadId: '',
            baseItem: item,
        };
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