import { Checklist } from '../checklist.interface';

const data: Checklist = {
    id: 'sl-horde',
    items: [
        { key: 'leveling', name: 'Leveling', type: 'header', id: 0, level: 0 },

        { key: 'leveling-bastion', name: 'Bastion', type: 'header', id: 0, level: 1 },
        { key: 'leveling-bastion-mainquests', name: 'The Path to Ascension', type: 'achievement', id: 14281 },
        { key: 'leveling-bastion-sidequests', name: 'Sojourner of Bastion', type: 'achievement', id: 14801 },
        { key: 'leveling-bastion-dungeon', name: 'Necrotic Wake', type: 'quest', id: 60057 },

        { key: 'leveling-maldraxxus', name: 'Maldraxxus', type: 'header', id: 0, level: 1 },
        { key: 'leveling-maldraxxus-mainquests', name: 'Blade of the Primus', type: 'achievement', id: 14206 },
        { key: 'leveling-maldraxxus-sidequests', name: 'Sojourner of Maldraxxus', type: 'achievement', id: 14799 },
        { key: 'leveling-maldraxxus-dungeon', name: 'Plaguefall', type: 'quest', id: 59520 },

        { key: 'leveling-ardenweald', name: 'Ardenweald', type: 'header', id: 0, level: 1 },
        { key: 'leveling-ardenweald-mainquests', name: 'Awaken, Ardenweald', type: 'achievement', id: 14164 },
        { key: 'leveling-ardenweald-sidequests', name: 'Sojourner of Ardenweald', type: 'achievement', id: 14800 },
        { key: 'leveling-ardenweald-dungeon', name: 'Tirna Scithe', type: 'quest', id: 62371 },

        { key: 'leveling-revendreth', name: 'Revendreth', type: 'header', id: 0, level: 1 },
        { key: 'leveling-revendreth-mainquests', name: 'The Master of Revendreth', type: 'achievement', id: 13878 },
        { key: 'leveling-revendreth-sidequests', name: 'Sojourner of Revendreth', type: 'achievement', id: 14798 },
        { key: 'leveling-revendreth-dungeon', name: 'Halls of Atonement', type: 'quest', id: 58092 },

        { key: 'leveling-general', name: 'General', type: 'header', id: 0, level: 1 },
        { key: 'leveling-general-50', name: 'Level 50', type: 'level', id: 0, max: 50 },
        { key: 'leveling-general-60', name: 'Level 60', type: 'level', id: 0, max: 60 },

        { key: 'leveling-gear', name: 'Gear', type: 'header', id: 0, level: 1 },
        { key: 'leveling-gear-158', name: 'Item Level 158 / Superior', type: 'avg-item-level', id: 0, max: 158 },

        { key: 'campaign', name: 'Covenant Campaign', type: 'header', id: 0, level: 0 },
        { key: 'campaign-choosingyourpurpose', name: 'Choosing Your Purpose', type: 'achievement', id: 14627 },
        { key: 'campaign-renown10', name: 'The Road to Renown', type: 'achievement', id: 14628 },
        { key: 'campaign-renown20', name: 'Gaining Respect', type: 'achievement', id: 14629 },
        { key: 'campaign-renown30', name: 'Becoming a Hero', type: 'achievement', id: 14630 },
        { key: 'campaign-renown40', name: 'Champion of the Covenant', type: 'achievement', id: 14631 },
        { key: 'campaign-finished', name: 'Covenant Campaign', type: 'achievement', id: 14790 },

        { key: 'reputation', name: 'Reputation', type: 'header', id: 0, level: 0 },
        { key: 'reputation-ascended', type: 'reputation', name: 'The Ascended', id: 2407, max: 6 },
        { key: 'reputation-undyingarmy', type: 'reputation', name: 'The Undying Army', id: 2410, max: 6 },
        { key: 'reputation-wildhunt', type: 'reputation', name: 'The Wild Hunt', id: 2465, max: 6 },
        { key: 'reputation-courtofharvesters', type: 'reputation', name: 'Court of Harvesters', id: 2413, max: 6 },
        // { key: 'reputation-venari', type: 'reputation', name: 'Ve\'nari', id: 2432, max: 6 },

        { key: 'professions', name: 'Professions', type: 'header', id: 0, level: 0 },

        { key: 'professions-herbalism', type: 'profession-primary', name: 'Shadowlands Herbalism', id: 2760 },
        { key: 'professions-mining', type: 'profession-primary', name: 'Shadowlands Mining', id: 2761 },
        { key: 'professions-skinning', type: 'profession-primary', name: 'Shadowlands Skinning', id: 2762 },
        { key: 'professions-tailoring', type: 'profession-primary', name: 'Shadowlands Tailoring', id: 2759 },
        { key: 'professions-enchanting', type: 'profession-primary', name: 'Shadowlands Enchanting', id: 2753 },
        { key: 'professions-engineering', type: 'profession-primary', name: 'Shadowlands Engineering', id: 2755 },
        { key: 'professions-inscription', type: 'profession-primary', name: 'Shadowlands Inscription', id: 2756 },
        { key: 'professions-alchemy', type: 'profession-primary', name: 'Shadowlands Alchemy', id: 2750 },
        { key: 'professions-jewelcrafting', type: 'profession-primary', name: 'Shadowlands Jewelcrafting', id: 2757 },
        { key: 'professions-leatherworking', type: 'profession-primary', name: 'Shadowlands Leatherworking', id: 2758 },
        { key: 'professions-blacksmithing', type: 'profession-primary', name: 'Shadowlands Blacksmithing', id: 2751 },

        { key: 'professions-cooking', type: 'profession-secondary', name: 'Shadowlands Cooking', id: 2752 },
        { key: 'professions-fishing', type: 'profession-secondary', name: 'Shadowlands Fishing', id: 2754 },

        { key: 'sanctum', name: 'Covenant Sanctum', type: 'header', id: 0, level: 0 },
        { key: 'sanctum-travelnetwork', name: 'Master Navigator', type: 'achievement', id: 14633 },
        { key: 'sanctum-animaconductor', name: 'Conducting Anima', type: 'achievement', id: 14632 },
        { key: 'sanctum-adventures', name: 'Adventurer in Chief', type: 'achievement', id: 14636 },
        { key: 'sanctum-special', name: 'Your Covenant\'s Favor', type: 'achievement', id: 14637 },
        { key: 'sanctum-heroes', name: 'Adventures: Harmony of Purpose', type: 'achievement', id: 14843 },
    ],
};

export {
    data,
};
