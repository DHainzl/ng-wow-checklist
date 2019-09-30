import { Checklist } from '../checklist.interface';

const data: Checklist = {
    id: 'bfa-alliance',
    items: [
        { key: 'leveling', name: 'Leveling', type: 'header', id: 0, level: 0 },

        { key: 'leveling-zuldazar', name: 'Zuldazar', type: 'header', id: 0, level: 1 },
        { key: 'leveling-zuldazar-thethroneofzuldazar', name: 'The Throne of Zuldazar', type: 'achievement', id: 11861 },
        { key: 'leveling-zuldazar-ataldazar', name: 'Atal\'Dazar', type: 'quest', id: 49901 },

        { key: 'leveling-voldun', name: 'Vol\'Dun', type: 'header', id: 0, level: 1 },
        { key: 'leveling-voldun-secretsinthesands', name: 'Secrets in the Sands', type: 'achievement', id: 12478 },
        { key: 'leveling-voldun-templeofsethraliss', name: 'Temple of Sethraliss', type: 'quest', id: 50551 },

        { key: 'leveling-nazmir', name: 'Nazmir', type: 'header', id: 0, level: 1 },
        { key: 'leveling-nazmir-thedarkheartofnazmir', name: 'The Dark Heart of Nazmir', type: 'achievement', id: 11868 },
        { key: 'leveling-nazmir-theunderrot', name: 'The Underrot', type: 'quest', id: 51302 },

        { key: 'leveling-general', name: 'General', type: 'header', id: 0, level: 1 },
        { key: 'leveling-general-110', name: 'Level 110', type: 'level', id: 0, max: 110 },
        { key: 'leveling-general-120', name: 'Level 120', type: 'level', id: 0, max: 120 },
        { key: 'leveling-general-flightmaster', name: 'Unlock Flight Masters Whistle', type: 'quest', id: 52451 },

        { key: 'wareffort', name: 'War Effort', type: 'header', id: 0, level: 0 },

        { key: 'wareffort-readyforwar', name: 'War Campaign: Ready for War', type: 'header', id: 0, level: 1 },
        { key: 'wareffort-readyforwar-drustvar', name: 'Drustvar Foothold', type: 'quest', id: 51985 },
        { key: 'wareffort-readyforwar-tiragardesound', name: 'Tiragarde Sound Foothold', type: 'quest', id: 51984 },
        { key: 'wareffort-readyforwar-stormsongvalley', name: 'Stormsong Valley Foothold', type: 'quest', id: 51986 },
        { key: 'wareffort-readyforwar-thefirstassault', name: 'The First Assault', type: 'quest', id: 51601 },
        { key: 'wareffort-readyforwar-themarshalsgrave', name: 'The Marshal\'s Grave', type: 'quest', id: 51789 },
        { key: 'wareffort-readyforwar-deathofatidesage', name: 'Death of a Tidesage', type: 'quest', id: 52122 },
        { key: 'wareffort-readyforwar-atthebottomofthesea', name: 'At the Bottom of the Sea', type: 'quest', id: 52978 },
        { key: 'wareffort-readyforwar-thestrikeonboralus', name: 'The Strike on Boralus', type: 'quest', id: 53003 },

        { key: 'wareffort-tidesofvengeance', name: 'War Campaign: Tides of Vengeance', type: 'header', id: 0, level: 1 },
        { key: 'wareffort-tidesofvengeance-thedayiswon', name: 'The Day is Won', type: 'quest', id: 53981 },
        { key: 'wareffort-tidesofvengeance-mekkatorquesbattleplans', name: 'Mekkatorque\'s Battle Plans', type: 'quest', id: 54094 },
        { key: 'wareffort-tidesofvengeance-throughthefrontdoor', name: 'Through the Front Door', type: 'quest', id: 54179 },
        { key: 'wareffort-tidesofvengeance-flyouttomeetthem', name: 'Fly Out to Meet Them', type: 'quest', id: 54280 },
        { key: 'wareffort-tidesofvengeance-battleofdazaralor', name: 'Battle of Dazar\'Alor', type: 'quest', id: 54282 },
        { key: 'wareffort-tidesofvengeance-adisplayofpower', name: 'A Display of Power', type: 'quest', id: 55051 },

        { key: 'wareffort-riseofazshara', name: 'War Campaign: Rise of Azshara', type: 'header', id: 0, level: 1 },
        { key: 'wareffort-riseofazshara-unfathomable', name: 'Unfathomable', type: 'achievement', id: 13709 },
        { key: 'wareffort-riseofazshara-themachagonianthreat', name: 'The Mechagonian Threat', type: 'achievement', id: 13700 },
        { key: 'wareffort-riseofazshara-stayofexecution', name: 'Stay of Execution', type: 'quest', id: 55779 },

        { key: 'wareffort-thefourthwar', name: 'War Campaign: The Fourth War', type: 'header', id: 0, level: 1 },
        { key: 'wareffort-thefourthwar-thecircleofstars', name: 'The Circle of Stars', type: 'achievement', id: 13725 },
        { key: 'wareffort-thefourthwar-thefourthwar', name: 'The Fourth War', type: 'achievement', id: 13924 },

        { key: 'wareffort-heartofazeroth', name: 'Heart of Azeroth', type: 'header', id: 0, level: 1 },
        { key: 'wareffort-heartofazeroth-heartforge', name: 'The Heart Forge', type: 'quest', id: 55618 },
        { key: 'wareffort-heartofazeroth-crucible-1', name: 'The Crucible of Flame - Rank 1', type: 'quest', id: 57010 },
        { key: 'wareffort-heartofazeroth-crucible-2', name: 'The Crucible of Flame - Rank 2 (Heart Level 54)', type: 'quest', id: 55398 },
        { key: 'wareffort-heartofazeroth-afreshtrauma', name: 'A Fresh Trauma (Heart Level 55)', type: 'quest', id: 55521},
        { key: 'wareffort-heartofazeroth-crucible-3', name: 'The Crucible of Flame - Rank 3 (Heart Level 60)', type: 'quest', id: 55657 },
        { key: 'wareffort-heartofazeroth-anoldscar', name: 'An Old Scar (Heart Level 65)', type: 'quest', id: 55732 },
        { key: 'wareffort-heartofazeroth-crucible-4', name: 'The Crucible of Flame - Rank 4 (Heart Level 70)', type: 'quest', id: -1 },
        { key: 'wareffort-heartofazeroth-wrathionsjournal', name: 'Wrathion\'s Journal', type: 'quest', id: 56504 },

        { key: 'wareffort-zandalarforever', name: 'Zandalar Forever!', type: 'header', id: 0, level: 1 },
        { key: 'wareffort-zandalarforever-toldagor', name: 'A Bargain of Blood', type: 'achievement', id: 12480 },
        { key: 'wareffort-zandalarforever-shrineofthestorm', name: 'The Final Seal', type: 'achievement', id: 12481 },

        { key: 'wareffort-gear', name: 'Gear', type: 'header', id: 0, level: 1 },
        { key: 'wareffort-gear-310', name: 'iLvl 310 / Superior', type: 'item-level', id: 0, max: 310 },
        { key: 'wareffort-gear-385', name: 'iLvl 385 / Benthic', type: 'item-level', id: 0, max: 385 },

        { key: 'reputation', name: 'Reputation', type: 'header', id: 0, level: 0 },

        { key: 'reputation-honorbound', type: 'reputation', name: 'The Honorbound', id: 2157, max: 7 },
        { key: 'reputation-championsofazeroth', type: 'reputation', name: 'Champions of Azeroth', id: 2164, max: 6 },
        { key: 'reputation-zandalariempire', type: 'reputation', name: 'Zandalari Empire', id: 2103, max: 6 },
        { key: 'reputation-voldunai', type: 'reputation', name: 'Voldunai', id: 2158, max: 6 },
        { key: 'reputation-talanjisexpedition', type: 'reputation', name: 'Talanji\'s Expedition', id: 2156, max: 6 },
        { key: 'reputation-tortollanseekers', type: 'reputation', name: 'Tortollan Seekers', id: 2163, max: 6 },
        { key: 'reputation-unshackled', type: 'reputation', name: 'The Unshackled', id: 2373, max: 6 },
        { key: 'reputation-rustbolt', type: 'reputation', name: 'Rustbolt Resistance', id: 2391, max: 6 },

        { key: 'professions', name: 'Professions', type: 'header', id: 0, level: 0 },

        { key: 'kultiran-herbalism', type: 'profession-primary', name: 'Kul Tiran Herbalism', id: 2549, max: 175 },
        { key: 'kultiran-mining', type: 'profession-primary', name: 'Kul Tiran Mining', id: 2565, max: 175 },
        { key: 'kultiran-skinning', type: 'profession-primary', name: 'Kul Tiran Skinning', id: 2557, max: 175 },
        { key: 'kultiran-tailoring', type: 'profession-primary', name: 'Kul Tiran Tailoring', id: 2533, max: 175 },
        { key: 'kultiran-enchanting', type: 'profession-primary', name: 'Kul Tiran Enchanting', id: 2486, max: 175 },
        { key: 'kultiran-engineering', type: 'profession-primary', name: 'Kul Tiran Engineering', id: 2499, max: 175 },
        { key: 'kultiran-inscription', type: 'profession-primary', name: 'Kul Tiran Inscription', id: 2507, max: 175 },
        { key: 'kultiran-alchemy', type: 'profession-primary', name: 'Kul Tiran Alchemy', id: 2478, max: 175 },
        { key: 'kultiran-jewelcrafting', type: 'profession-primary', name: 'Kul Tiran Jewelcrafting', id: 2517, max: 175 },
        { key: 'kultiran-leatherworking', type: 'profession-primary', name: 'Kul Tiran Leatherworking', id: 2525, max: 175 },
        { key: 'kultiran-blacksmithing', type: 'profession-primary', name: 'Kul Tiran Blacksmithing', id: 2437, max: 175 },

        { key: 'kultiran-cooking', type: 'profession-secondary', name: 'Kul Tiran Cooking', id: 2541, max: 175 },
        { key: 'kultiran-fishing', type: 'profession-secondary', name: 'Kul Tiran Fishing', id: 2585, max: 175 },
        { key: 'kultiran-archaeology', type: 'profession-secondary', name: 'Kul Tiran Archaeology', id: 794, max: 950 },

        { key: 'ship', name: 'Ship', type: 'header', id: 0, level: 0 },

        { key: 'ship-upgrades', name: 'Upgrades', type: 'header', id: 0, level: 1 },

        { key: 'ship-upgrades-tier1', name: 'Tier 1 (Seafarer\'s Hearth OR Swift Landing)', type: 'manual', id: 0 },
        { key: 'ship-upgrades-tier2', name: 'Tier 2 (Upgraded Troop Barracks OR Troop Portal Network)', type: 'manual', id: 0 },
        { key: 'ship-upgrades-tier3', name: 'Tier 3 (Island Plunderer OR Island Archeologist)', type: 'manual', id: 0 },
        { key: 'ship-upgrades-tier4', name: 'Tier 4 (World Azerite Detector OR Local Transportation)', type: 'manual', id: 0 },
        { key: 'ship-upgrades-tier5', name: 'Tier 5 (Warfront Resourcer OR Warfront General)', type: 'manual', id: 0 },
        { key: 'ship-upgrades-tier6', name: 'Tier 6 (Horde Ambassador)', type: 'manual', id: 0 },

        { key: 'ship-valtrois', name: 'Follower: Arcanist Valtrois', type: 'header', id: 0, level: 1 },
        { key: 'ship-valtrois-collected', name: 'Collected', type: 'quest', id: 51770 },
        { key: 'ship-valtrois-upgraded', name: 'Legendary Quality', type: 'manual', id: 0 },

        { key: 'ship-grapplehammer', name: 'Follower: Hoibart Grapplehammer', type: 'header', id: 0, level: 1 },
        { key: 'ship-grapplehammer-collected', name: 'Collected', type: 'quest', id: 51987 },
        { key: 'ship-grapplehammer-upgraded', name: 'Legendary Quality', type: 'manual', id: 0 },

        { key: 'ship-rexxar', name: 'Follower: Rexxar', type: 'header', id: 0, level: 1 },
        { key: 'ship-rexxar-collected', name: 'Collected', type: 'quest', id: 51753 },
        { key: 'ship-rexxar-upgraded', name: 'Legendary Quality', type: 'manual', id: 0 },

        { key: 'ship-tyjin', name: 'Follower: Shadow Hunter Ty\'jin', type: 'header', id: 0, level: 1 },
        { key: 'ship-tyjin-collected', name: 'Collected', type: 'quest', id: 51975 },
        { key: 'ship-tyjin-upgraded', name: 'Legendary Quality', type: 'manual', id: 0 },

        { key: 'ship-voss', name: 'Follower: Lilian Voss', type: 'header', id: 0, level: 1 },
        { key: 'ship-voss-collected', name: 'Collected', type: 'quest', id: 52861 },
        { key: 'ship-voss-upgraded', name: 'Legendary Quality', type: 'manual', id: 0 },

        { key: 'ship-tattersail', name: 'Follower: Dread Admiral Tattersail', type: 'header', id: 0, level: 1 },
        { key: 'ship-tattersail-collected', name: 'Collected', type: 'quest', id: 56379 },
        { key: 'ship-tattersail-upgraded', name: 'Legendary Quality', type: 'manual', id: 0 },
    ],
};

export {
    data,
};
