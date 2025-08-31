import { inject, Injectable, InjectionToken } from "@angular/core";
import { BattleNetAchievements } from "../../battle-net/character/types/battlenet-achievement";
import { BattleNetEquipment } from "../../battle-net/character/types/battlenet-equipment";
import { BattleNetMedia } from "../../battle-net/character/types/battlenet-media";
import { BattleNetProfessions } from "../../battle-net/character/types/battlenet-profession";
import { BattleNetProfile } from "../../battle-net/character/types/battlenet-profile";
import { BattleNetQuests } from "../../battle-net/character/types/battlenet-quest";
import { BattleNetCharacterReputations } from "../../battle-net/character/types/battlenet-reputation";
import { CharacterInfo, CharacterIngameData } from "../../character-store/character-store.interface";
import { ChecklistItem } from "../../checklist/checklist.interface";
import { EvaluatedChecklistItem } from "../evaluated-checklist-item.interface";

export const CHECKLIST_ITEM = new InjectionToken<ChecklistItem>('Checklist Item');
export const CHECKLIST_EVALUATED_ITEMS = new InjectionToken<EvaluatedChecklistItem[]>('Previously evaluated items');
export const CHECKLIST_ALL_ITEMS = new InjectionToken<ChecklistItem[]>('All Checklist Items');
export const CHECKLIST_QUESTS = new InjectionToken<BattleNetQuests>('Provided Checklist Data: Quests')
export const CHECKLIST_PROFESSIONS = new InjectionToken<BattleNetProfessions>('Provided Checklist Data: Professions')
export const CHECKLIST_REPUTATIONS = new InjectionToken<BattleNetCharacterReputations>('Provided Checklist Data: Reputation')
export const CHECKLIST_ACHIEVEMENTS = new InjectionToken<BattleNetAchievements>('Provided Checklist Data: Achievements')
export const CHECKLIST_EQUIPMENT = new InjectionToken<BattleNetEquipment>('Provided Checklist Data: Equipment')
export const CHECKLIST_MEDIA = new InjectionToken<BattleNetMedia>('Provided Checklist Data: Media')
export const CHECKLIST_PROFILE = new InjectionToken<BattleNetProfile>('Provided Checklist Data: Profile')
export const CHECKLIST_CHARACTERINFO = new InjectionToken<CharacterInfo>('Provided Checklist Data: Character Info')
export const CHECKLIST_INGAMEDATA = new InjectionToken<CharacterIngameData>('Provided Checklist Data: Ingame data')

@Injectable()
export abstract class ChecklistHandler<T extends ChecklistItem> {
    protected readonly item = inject<T>(CHECKLIST_ITEM);
    protected readonly allItems = inject<ChecklistItem[]>(CHECKLIST_ALL_ITEMS);

    abstract evaluate(): EvaluatedChecklistItem;

    getBaseEvaluatedItem(): EvaluatedChecklistItem {
        return {
            completed: 'loading',
            indention: this.getIndention(),
            label: this.item.name,
            note: undefined,
            shown: true,
            subitems: [],
            wowheadId: '',
            baseItem: this.item,
        };
    }

    private getIndention(): number {
        if (this.item.type === 'header') {
            return this.item.level;
        }

        let lastIndention = 0;
        this.allItems.find(item => {
            if (item.type === 'header') {
                lastIndention = item.level;
            }

            return item.key === this.item.key;
        });

        return lastIndention + 1;
    }
}