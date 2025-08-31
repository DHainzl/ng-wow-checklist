import { inject, Injectable } from "@angular/core";
import { BattleNetProfile } from "../battle-net/character/types/battlenet-profile";
import { Checklist, ChecklistItem } from "../checklist/checklist.interface";
import { EvaluatedChecklistItem } from "./evaluated-checklist-item.interface";
import { ChecklistEvaluatorData } from "./handlers/_handler.interface";
import { ChecklistHandler } from "./handlers/_handler.service";
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
    private readonly HANDLERS: { [ X in ChecklistItem['type'] ]: ChecklistHandler<ChecklistItem> } = {
        header: inject(ChecklistHeaderHandler),
        achievement: inject(ChecklistAchievementHandler),
        quest: inject(ChecklistQuestHandler),
        'any-quest': inject(ChecklistAnyQuestHandler),
        reputation: inject(ChecklistReputationHandler),
        'profession-primary': inject(ChecklistPrimaryProfessionHandler),
        'profession-secondary': inject(ChecklistSecondaryProfessionHandler),
        level: inject(ChecklistLevelHandler),
        'avg-item-level': inject(ChecklistAverageEquipmentHandler),
        manual: inject(ChecklistManualHandler),
        'item-level': inject(ChecklistEquipmentHandler),
        renown: inject(ChecklistRenownHandler),
        'sanctum-talent': inject(ChecklistSanctumTalentHandler),
        'sanctum-follower': inject(ChecklistSanctumFollowerHandler),
        'sanctum-follower-any': inject(ChecklistSanctumFollowerAnyHandler),
        'sanctum-conduit': inject(ChecklistSanctumConduitHandler),
        'sanctum-missions-count': inject(ChecklistSanctumMissionsCountHandler),
        'sanctum-legendary': inject(ChecklistSanctumLegendaryHandler),
        'reputation-renown': inject(ChecklistReputationRenownHandler),
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
            return this.HANDLERS[item.type].evaluate(item, evaluated, data);
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