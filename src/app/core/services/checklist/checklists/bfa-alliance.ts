import { Checklist } from '../checklist.interface';

const data: Checklist = {
    id: 'bfa-alliance',
    items: [
        { key: 'leveling', name: 'Leveling', type: 'header', id: 0, level: 0 },

        { key: 'leveling-drustvar', name: 'Drustvar', type: 'header', id: 0, level: 1 },
        { key: 'leveling-drustvar-drustdoit', name: 'Drust Do It.', type: 'achievement', id: 12497 },
        { key: 'leveling-drustvar-waycrestmanor', name: 'Waycrest Manor', type: 'quest', id: 50639 },

        { key: 'leveling-stormsong', name: 'Stormsong Valley', type: 'header', id: 0, level: 1 },
        { key: 'leveling-stormsong-stormsonganddance', name: 'Stormsong and Dance', type: 'achievement', id: 12496 },
        { key: 'leveling-stormsong-shrineofthestorm', name: 'Shrine of the Storm', type: 'quest', id: 50825 },

        { key: 'leveling-tiragarde', name: 'Tiragarde Sound', type: 'header', id: 0, level: 1 },
        { key: 'leveling-tiragarde-asoundplan', name: 'A Sound Plan', type: 'achievement', id: 12473 },
        { key: 'leveling-tiragarde-freehold', name: 'Freehold', type: 'quest', id: 52148 },

        { key: 'leveling-general', name: 'General', type: 'header', id: 0, level: 1 },
        { key: 'leveling-general-110', name: 'Level 110', type: 'level', id: 0, max: 110 },
        { key: 'leveling-general-120', name: 'Level 120', type: 'level', id: 0, max: 120 },
        { key: 'leveling-general-flightmaster', name: 'Unlock Flight Masters Whistle', type: 'quest', id: 51918 },

        { key: 'wareffort', name: 'War Effort', type: 'header', id: 0, level: 0 },

        { key: 'wareffort-readyforwar', name: 'War Campaign: Ready for War', type: 'header', id: 0, level: 1 },
        { key: 'wareffort-readyforwar-nazmir', name: 'Nazmir Foothold', type: 'quest', id: 51967 },
        { key: 'wareffort-readyforwar-voldun', name: 'Vol\'dun Foothold', type: 'quest', id: 51969 },
        { key: 'wareffort-readyforwar-zuldazar', name: 'Zuldazar Foothold', type: 'quest', id: 51968 },
        { key: 'wareffort-readyforwar-bloodonthesand', name: 'Blood on the Sand', type: 'quest', id: 52146 },
        { key: 'wareffort-readyforwar-chasingdarkness', name: 'Chasing Darkness', type: 'quest', id: 52219 },
        { key: 'wareffort-readyforwar-agoldenopportunity', name: 'A Golden Opportunity', type: 'quest', id: 52261 },
        { key: 'wareffort-readyforwar-bloodinthewater', name: 'Blood in the Water', type: 'quest', id: 52496 },
        { key: 'wareffort-readyforwar-thestrikeonzuldazar', name: 'The Strike on Zuldazar', type: 'quest', id: 52790 },

        { key: 'wareffort-tidesofvengeance', name: 'War Campaign: Tides of Vengeance', type: 'header', id: 0, level: 1 },
        { key: 'wareffort-tidesofvengeance-warmarcheson', name: 'War Marches On', type: 'quest', id: 53887 },
        { key: 'wareffort-tidesofvengeance-thesleeperagent', name: 'The Sleeper Agent', type: 'quest', id: 54206 },
        { key: 'wareffort-tidesofvengeance-mischiefmanaged', name: 'Mischief Managed', type: 'quest', id: 54510 },
        { key: 'wareffort-tidesofvengeance-hewhowalksinthelight', name: 'He Who Walks in the Light', type: 'quest', id: 54459 },
        { key: 'wareffort-tidesofvengeance-deadreckoning', name: 'Dead Reckoning', type: 'quest', id: 54183 },
        { key: 'wareffort-tidesofvengeance-agatheringoffoes', name: 'A Gathering of Foes', type: 'quest', id: 55090 },

        { key: 'wareffort-riseofazshara', name: 'War Campaign: Rise of Azshara', type: 'header', id: 0, level: 1 },
        { key: 'wareffort-riseofazshara-sunkenambitions', name: 'Sunken Ambitions', type: 'achievement', id: 13710 },
        { key: 'wareffort-riseofazshara-themachagonianthreat', name: 'The Mechagonian Threat', type: 'achievement', id: 13553 },
        { key: 'wareffort-riseofazshara-stayofexecution', name: 'Stay of Execution', type: 'quest', id: 55783 },

        { key: 'wareffort-thefourthwar', name: 'War Campaign: The Fourth War', type: 'header', id: 0, level: 1 },
        { key: 'wareffort-thefourthwar-thefourthwar', name: 'The Fourth War', type: 'achievement', id: 13925 },

        { key: 'wareffort-visionsofnzoth', name: 'War Campaign: Visions of N\'Zoth', type: 'header', id: 0, level: 1 },
        { key: 'wareffort-visionsofnzoth-sailwiththetide', name: 'Sail with the Tide', type: 'quest', id: 57324 },
        { key: 'wareffort-visionsofnzoth-moguassault', name: 'Mogu Assault Introduction', type: 'quest', id: 57076 },
        { key: 'wareffort-visionsofnzoth-mantidassault', name: 'Mantid Assault Introduction', type: 'quest', id: 56647 },
        { key: 'wareffort-visionsofnzoth-aquirassault', name: 'Aqir Assault Introduction', type: 'quest', id: 58009 },
        { key: 'wareffort-visionsofnzoth-amathetassault', name: 'Amathet Assault Introduction', type: 'quest', id: 58645 },
        { key: 'wareffort-visionsofnzoth-nyalotha', name: 'Ny\'alotha, the Waking City: The Corruptor\'s End', type: 'quest', id: 58632 },

        { key: 'wareffort-heartofazeroth', name: 'Heart of Azeroth', type: 'header', id: 0, level: 1 },
        { key: 'wareffort-heartofazeroth-heartforge', name: 'The Heart Forge', type: 'quest', id: 55618 },
        { key: 'wareffort-heartofazeroth-crucible-1', name: 'The Crucible of Flame - Rank 1', type: 'quest', id: 57010 },
        { key: 'wareffort-heartofazeroth-crucible-2', name: 'The Crucible of Flame - Rank 2 (Heart Level 54)', type: 'quest', id: 55398 },
        { key: 'wareffort-heartofazeroth-afreshtrauma', name: 'A Fresh Trauma (Heart Level 55)', type: 'quest', id: 55521},
        { key: 'wareffort-heartofazeroth-crucible-3', name: 'The Crucible of Flame - Rank 3 (Heart Level 60)', type: 'quest', id: 55657 },
        { key: 'wareffort-heartofazeroth-anoldscar', name: 'An Old Scar (Heart Level 65)', type: 'quest', id: 55732 },
        { key: 'wareffort-heartofazeroth-crucible-4', name: 'The Crucible of Flame - Rank 4 (Heart Level 70)', type: 'quest', id: 56401 },
        { key: 'wareffort-heartofazeroth-intodreams', name: 'Into Dreams', type: 'quest', id: 58631 },
        { key: 'wareffort-heartofazeroth-level80', name: 'Heart Level 80', type: 'item-level', id: 0, slot: 'NECK', level: 493 },

        { key: 'wareffort-cloak', name: 'Ashjra\'kamas, Shroud of Resolve', type: 'header', id: 0, level: 1 },
        { key: 'wareffort-cloak-level', name: 'Cloak Rank 15', type: 'item-level', id: 0, slot: 'BACK', level: 500 },
        { key: 'wareffort-cloak-upgrades', name: 'All Cloak Upgrades', type: 'achievement', id: 14061 },

        { key: 'wareffort-anationunited', name: 'A Nation United', type: 'header', id: 0, level: 1 },
        { key: 'wareffort-anationunited-toldagor', name: 'Tol Dagor: The Fourth Key', type: 'quest', id: 52445 },
        { key: 'wareffort-anationunited-shrineofthestorm', name: 'Shrine of the Storm: The Missing Ritual', type: 'quest', id: 52510 },
        { key: 'wareffort-anationunited-waycrestmanor', name: 'Waycrest Manor: Draining the Heartsbane', type: 'quest', id: 52486 },
        { key: 'wareffort-anationunited-siegeofboralus', name: 'Siege of Boralus: Lady Ashvane\'s Return', type: 'quest', id: 52153 },

        { key: 'wareffort-gear', name: 'Gear', type: 'header', id: 0, level: 1 },
        { key: 'wareffort-gear-310', name: 'iLvl 310 / Superior', type: 'avg-item-level', id: 0, max: 310 },
        { key: 'wareffort-gear-385', name: 'iLvl 385 / Benthic', type: 'avg-item-level', id: 0, max: 385 },

        { key: 'reputation', name: 'Reputation', type: 'header', id: 0, level: 0 },
        { key: 'reputation-7thlegion', type: 'reputation', name: '7th Legion', id: 2159, max: 7 },
        { key: 'reputation-championsofazeroth', type: 'reputation', name: 'Champions of Azeroth', id: 2164, max: 6 },
        { key: 'reputation-orderofembers', type: 'reputation', name: 'Order of Embers', id: 2161, max: 6 },
        { key: 'reputation-proudmooreadmiralty', type: 'reputation', name: 'Proudmoore Admiralty', id: 2160, max: 6 },
        { key: 'reputation-stormswake', type: 'reputation', name: 'Storm\'s Wake', id: 2162, max: 6 },
        { key: 'reputation-tortollanseekers', type: 'reputation', name: 'Tortollan Seekers', id: 2163, max: 6 },
        { key: 'reputation-wavebladeankoan', type: 'reputation', name: 'Waveblade Ankoan', id: 2400, max: 6 },
        { key: 'reputation-rustbolt', type: 'reputation', name: 'Rustbolt Resistance', id: 2391, max: 6 },
        { key: 'reputation-rajani', type: 'reputation', name: 'Rajani', id: 2415, max: 6 },
        { key: 'reputation-uldumaccord', type: 'reputation', name: 'Uldum Accord', id: 2417, max: 6 },

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
        { key: 'ship-upgrades-tier6', name: 'Tier 6 (Alliance Ambassador)', type: 'manual', id: 0 },

        { key: 'ship-falstad', name: 'Follower: Falstad Wildhammer', type: 'header', id: 0, level: 1 },
        { key: 'ship-falstad-collected', name: 'Collected', type: 'quest', id: 51714 },
        { key: 'ship-falstad-upgraded', name: 'Legendary Quality', type: 'manual', id: 0 },

        { key: 'ship-keeshan', name: 'Follower: John J. Keeshan', type: 'header', id: 0, level: 1 },
        { key: 'ship-keeshan-collected', name: 'Collected', type: 'quest', id: 52013 },
        { key: 'ship-keeshan-upgraded', name: 'Legendary Quality', type: 'manual', id: 0 },

        { key: 'ship-kelsey', name: 'Follower: Kelsey Steelspark', type: 'header', id: 0, level: 1 },
        { key: 'ship-kelsey-collected', name: 'Collected', type: 'quest', id: 52003 },
        { key: 'ship-kelsey-upgraded', name: 'Legendary Quality', type: 'manual', id: 0 },

        { key: 'ship-umbric', name: 'Follower: Magister Umbric', type: 'header', id: 0, level: 1 },
        { key: 'ship-umbric-collected', name: 'Collected', type: 'quest', id: 52008 },
        { key: 'ship-umbric-upgraded', name: 'Legendary Quality', type: 'manual', id: 0 },

        { key: 'ship-shandris', name: 'Follower: Shandris Feathermoon', type: 'header', id: 0, level: 1 },
        { key: 'ship-shandris-collected', name: 'Collected', type: 'quest', id: 53098 },
        { key: 'ship-shandris-upgraded', name: 'Legendary Quality', type: 'manual', id: 0 },

        { key: 'ship-jestereth', name: 'Follower: Grand Admiral Jes-Tereth', type: 'header', id: 0, level: 1 },
        { key: 'ship-jestereth-collected', name: 'Collected', type: 'quest', id: 56378 },
        { key: 'ship-jestereth-upgraded', name: 'Legendary Quality', type: 'manual', id: 0 },
    ],
};

export {
    data,
};
