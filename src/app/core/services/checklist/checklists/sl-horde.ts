import { Checklist } from '../checklist.interface';

const data: Checklist = {
    id: 'sl-horde',
    items: [
        { key: 'leveling', name: 'Leveling', type: 'header', level: 0 },

        { key: 'leveling-bastion', name: 'Bastion', type: 'header', level: 1 },
        { key: 'leveling-bastion-mainquests', name: 'The Path to Ascension', type: 'achievement', id: 14281 },
        { key: 'leveling-bastion-sidequests', name: 'Sojourner of Bastion', type: 'achievement', id: 14801 },
        { key: 'leveling-bastion-dungeon', name: 'Necrotic Wake', type: 'quest', id: 60057 },

        { key: 'leveling-maldraxxus', name: 'Maldraxxus', type: 'header', level: 1 },
        { key: 'leveling-maldraxxus-mainquests', name: 'Blade of the Primus', type: 'achievement', id: 14206 },
        { key: 'leveling-maldraxxus-sidequests', name: 'Sojourner of Maldraxxus', type: 'achievement', id: 14799 },
        { key: 'leveling-maldraxxus-dungeon', name: 'Plaguefall', type: 'quest', id: 59520 },

        { key: 'leveling-ardenweald', name: 'Ardenweald', type: 'header', level: 1 },
        { key: 'leveling-ardenweald-mainquests', name: 'Awaken, Ardenweald', type: 'achievement', id: 14164 },
        { key: 'leveling-ardenweald-sidequests', name: 'Sojourner of Ardenweald', type: 'achievement', id: 14800 },
        { key: 'leveling-ardenweald-dungeon', name: 'Tirna Scithe', type: 'quest', id: 62371 },

        { key: 'leveling-revendreth', name: 'Revendreth', type: 'header', level: 1 },
        { key: 'leveling-revendreth-mainquests', name: 'The Master of Revendreth', type: 'achievement', id: 13878 },
        { key: 'leveling-revendreth-sidequests', name: 'Sojourner of Revendreth', type: 'achievement', id: 14798 },
        { key: 'leveling-revendreth-dungeon', name: 'Halls of Atonement', type: 'quest', id: 58092 },

        { key: 'leveling-general', name: 'General', type: 'header', level: 1 },
        { key: 'leveling-general-50', name: 'Level 50', type: 'level', max: 50 },
        { key: 'leveling-general-60', name: 'Level 60', type: 'level', max: 60 },

        { key: 'leveling-gear', name: 'Gear', type: 'header', level: 1 },
        { key: 'leveling-gear-158', name: 'Item Level 158 / Superior', type: 'avg-item-level', max: 158 },

        { key: 'campaign', name: 'Covenant Campaign', type: 'header', level: 0 },
        { key: 'campaign-choosingyourpurpose', name: 'Choosing Your Purpose', type: 'achievement', id: 14627 },
        { key: 'campaign-renown10', name: 'Renown 10', type: 'renown', threshold: 10 },
        { key: 'campaign-renown20', name: 'Renown 20', type: 'renown', threshold: 20 },
        { key: 'campaign-renown30', name: 'Renown 30', type: 'renown', threshold: 30 },
        { key: 'campaign-renown40', name: 'Renown 40', type: 'renown', threshold: 40 },
        { key: 'campaign-torghast', name: 'The Captive King', type: 'quest', id: 61730 },
        { key: 'campaign-finished-kyrian', name: 'Covenant Campaign', covenant: 'Kyrian', type: 'quest', id: 62557 },
        { key: 'campaign-finished-necrolords', name: 'Covenant Campaign', covenant: 'Necrolord', type: 'quest', id: 62406 },
        { key: 'campaign-finished-nightfae', name: 'Covenant Campaign', covenant: 'Night Fae', type: 'quest', id: 60108 },
        { key: 'campaign-finished-venthyr', name: 'Covenant Campaign', covenant: 'Venthyr', type: 'quest', id: 58407 },
        { key: 'chainsofdomination-boxofmanythings', name: 'Box of Many Things', type: 'quest', id: 64216 },
        { key: 'chainsofdomination-tazavesh-intro', name: 'The Veiled Market', type: 'quest', id: 63985 },
        { key: 'chainsofdomination-establishing-the-archive', name: 'Establishing the Archive', type: 'quest', id: 63738 },
        { key: 'chainsofdomination-they-could-be-anyone', name: 'They Could Be Anyone', type: 'quest', id: 63763 },

        { key: 'chainsofdomination', name: 'Chains of Domination', type: 'header', level: 0 },
        { key: 'chainsofdomination-renown-50', name: 'Renown 50', type: 'renown', threshold: 50 },
        { key: 'chainsofdomination-renown-60', name: 'Renown 60', type: 'renown', threshold: 60 },
        { key: 'chainsofdomination-renown-70', name: 'Renown 70', type: 'renown', threshold: 70 },
        { key: 'chainsofdomination-renown-80', name: 'Renown 80', type: 'renown', threshold: 80 },
        { key: 'chainsofdomination-united-front', name: 'United Front', type: 'achievement', id: 15000 },
        { key: 'chainsofdomination-story', name: 'Chains of Domination', type: 'achievement', id: 14961 },

        { key: 'reputation', name: 'Reputation', type: 'header', level: 0 },
        { key: 'reputation-ascended', type: 'reputation', name: 'The Ascended', id: 2407, max: 6 },
        { key: 'reputation-undyingarmy', type: 'reputation', name: 'The Undying Army', id: 2410, max: 6 },
        { key: 'reputation-wildhunt', type: 'reputation', name: 'The Wild Hunt', id: 2465, max: 6 },
        { key: 'reputation-courtofharvesters', type: 'reputation', name: 'Court of Harvesters', id: 2413, max: 6 },
        { key: 'reputation-venari', type: 'reputation', name: 'Ve\'nari', id: 2432, max: 4 },
        { key: 'reputation-deaths-advance', type: 'reputation', name: 'Death\'s Advance', id: 2470, max: 6 },
        { key: 'reputation-archivists-codex', type: 'reputation', name: 'The Archivists Codex', id: 2472, max: 3 },

        { key: 'professions', name: 'Professions', type: 'header', level: 0 },

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

        { key: 'sanctum', name: 'Covenant Sanctum', type: 'header', level: 0 },
        { key: 'sanctum-travelnetwork', name: 'Master Navigator', type: 'achievement', id: 14633 },
        { key: 'sanctum-animaconductor', name: 'Conducting Anima', type: 'achievement', id: 14632 },
        { key: 'sanctum-adventures', name: 'Adventurer in Chief', type: 'achievement', id: 14636 },
        { key: 'sanctum-special', name: 'Your Covenant\'s Favor', type: 'manual' },
    ],
};

export {
    data,
};
