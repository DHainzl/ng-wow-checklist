import { Checklist } from '../checklist.interface';

const data: Checklist = {
    id: 'dragonflight',
    items: [
        { key: 'leveling', name: 'Leveling', type: 'header', level: 0 },

        { key: 'leveling-wakingshores', name: 'The Waking Shores', type: 'header', level: 1 },
        { key: 'leveling-wakingshores-wakinghope', name: 'Waking Hope', type: 'achievement', id: 16334 },
        { key: 'leveling-wakingshores-sojourner', name: 'Sojourner of the Waking Shores', type: 'achievement', id: 16401 },

        { key: 'leveling-ohnahranplains', name: 'Ohn\'ahran Plains', type: 'header', level: 1 },
        { key: 'leveling-ohnahranplains-ohnaroll', name: 'Ohn\'a\'Roll', type: 'achievement', id: 15394 },
        { key: 'leveling-ohnahranplains-sojourner', name: 'Sojourner of the Oh\'nahran Plains', type: 'achievement', id: 16405 },

        { key: 'leveling-azurespan', name: 'The Azure Span', type: 'header', level: 1 },
        { key: 'leveling-azurespan-azurespanner', name: 'Azure Spanner', type: 'achievement', id: 16336 },
        { key: 'leveling-azurespan-sojourner', name: 'Sojourner of the Azure Span', type: 'achievement', id: 16428 },

        { key: 'leveling-thaldraszus', name: 'Thaldraszus', type: 'header', level: 1 },
        { key: 'leveling-thaldraszus-spellit', name: 'Just Don\' Ask Me to Spell It', type: 'achievement', id: 16363 },
        { key: 'leveling-thaldraszus-sojourner', name: 'Sojourner of Thaldraszus', type: 'achievement', id: 16398 },

        { key: 'leveling-general', name: 'General', type: 'header', level: 1 },
        { key: 'leveling-general-60', name: 'Level 60', type: 'level', max: 60 },
        { key: 'leveling-general-70', name: 'Level 70', type: 'level', max: 70 },

        { key: 'story', name: 'Story Quests', type: 'header', level: 0 },

        { key: 'story-dragonflight', name: 'Dragonflight', type: 'header', level: 1 },
        { key: 'story-dragonflight-emissary', name: 'Dragon Isles Emissary', type: 'quest', id: 72585 },
        { key: 'story-dragonflight-motheroathstone', name: 'The Mother Oathstone', type: 'quest', id: 67073 },
        { key: 'story-dragonflight-chieftainsduty', name: 'The Chieftain\'s Duty', type: 'quest', id: 72753 },
        { key: 'story-dragonflight-mysterysealed', name: 'A Mystery, Sealed', type: 'quest', id: 72756 },
        { key: 'story-dragonflight-silverpurpose', name: 'The Silver Purpose', type: 'quest', id: 67084 },
        { key: 'story-dragonflight-titanhalls', name: 'In the Halls of Titans', type: 'quest', id: 72752 },
        { key: 'story-dragonflight-gardenofsecrets', name: 'Garden of Secrets', type: 'quest', id: 72759 },
        { key: 'story-dragonflight-thedreamer', name: 'The Dreamer', type: 'quest', id: 72758 },
        { key: 'story-dragonflight-sparkofingenuity', name: 'The Spark of Ingenuity', type: 'quest', id: 70900 },
        { key: 'story-dragonflight-baine', name: 'A New Beginning', type: 'quest', id: 75258 },
        { key: 'story-dragonflight-silvermettle', name: 'Silver Mettle', type: 'quest', id: 72444 },
        { key: 'story-dragonflight-causewithoutarebel', name: 'Cause Without a Rebel', type: 'quest', id: 75230 },
        { key: 'story-dragonflight-infinityandbeyond', name: 'Infinity and Beyond', type: 'quest', id: 76422 },
        { key: 'story-dragonflight-onnewwings', name: 'On New Wings', type: 'quest', id: 76597 },
        { key: 'story-dragonflight-dislocateddisc', name: 'Dislocated Disc Located', type: 'quest', id: 75638 },
        { key: 'story-dragonflight-timetoprocess', name: 'Time to Process', type: 'quest', id: 77344 },
        { key: 'story-dragonflight-logotyrapy', name: 'Logotyrapy', type: 'quest', id: 77341 },
        { key: 'story-dragonflight-misfitdragons', name: 'Misfit Dragons', type: 'quest', id: 76465 },
        { key: 'story-dragonflight-beginninganewdawn', name: 'Beginning a New Dawn', type: 'quest', id: 78189 },

        { key: 'story-embersofneltharion', name: 'Embers of Neltharion', type: 'header', level: 1 },
        { key: 'story-embersofneltharion-acrechedivided', name: 'A Creche Divided', type: 'quest', id: 73156 },
        { key: 'story-embersofneltharion-breakingground', name: 'Breaking Ground', type: 'quest', id: 75644 },
        { key: 'story-embersofneltharion-sunderedlegacy', name: 'Sundered Legacy', type: 'quest', id: 72965 },
        { key: 'story-embersofneltharion-ancientbargain', name: 'The Ancient Bargain', type: 'quest', id: 75145 },
        { key: 'story-embersofneltharion-inheritedsin', name: 'Inherited Sin', type: 'quest', id: 74563 },
        { key: 'story-embersofneltharion-inevitableconfrontation', name: 'Inevitable Confrontation', type: 'quest', id: 72930 },
        { key: 'story-embersofneltharion-aflameextinguished', name: 'A Flame, Extinguished', type: 'quest', id: 75417 },

        { key: 'story-guardiansofthedream', name: 'Guardians of the Dream', type: 'header', level: 1 },
        { key: 'story-guardiansofthedream-coalition-of-flames', name: 'The Coalition of Flames', type: 'quest', id: 75923 },
        { key: 'story-guardiansofthedream-enterthedream', name: 'Enter the Dream', type: 'quest', id: 77283 },
        { key: 'story-guardiansofthedream-druidsoftheflame', name: 'Druids of the Flame', type: 'quest', id: 76443 },
        { key: 'story-guardiansofthedream-iceandfire', name: 'Ice and Fire', type: 'quest', id: 77178 },
        { key: 'story-guardiansofthedream-eyeofysera', name: 'Eye of Ysera', type: 'quest', id: 76337 },
        { key: 'story-guardiansofthedream-adreamoffieldsandfire', name: 'A Dream of Fields and Fire', type: 'quest', id: 76401 },
        { key: 'story-guardiansofthedream-newbeginnings', name: 'New Beginnings', type: 'quest', id: 76283 },

        { key: 'story-epilogue', name: 'Epilogue', type: 'header', level: 1 },
        { key: 'story-epilogue-thereturning', name: 'The Returning', type: 'quest', id: 78864 },
        { key: 'story-epilogue-siblingsuntiltheend', name: 'Siblings Until the End', type: 'quest', id: 78865 },

        { key: 'story-bluedragons', name: 'Blue Dragonflight Reunion', type: 'header', level: 1 },
        { key: 'story-bluedragons-cleanup', name: 'Clean up the Veiled Ossuary', type: 'quest', id: 75023 },
        { key: 'story-bluedragons-azuregos', name: 'Recruit Azuregos', type: 'quest', id: 72938 },
        { key: 'story-bluedragons-lanigosa', name: 'Recruit Lanigosa', type: 'quest', id: 74783 },
        { key: 'story-bluedragons-haleh', name: 'Recruit Haleh', type: 'quest', id: 74356 },
        { key: 'story-bluedragons-surigosa', name: 'Recruit Surigosa', type: 'quest', id: 74335 },
        { key: 'story-bluedragons-kirygosa', name: 'Recruit Kirygosa', type: 'quest', id: 74291 },
        { key: 'story-bluedragons-zeros', name: 'Recruit Zeros', type: 'quest', id: 73181 },
        { key: 'story-bluedragons-reunited', name: 'Reunited Again', type: 'quest', id: 72951 },

        { key: 'reputation', name: 'Reputation', type: 'header', level: 0 },
        { key: 'reputation-dragonscaleexpedition', type: 'reputation-renown', name: 'Dragonscale Expedition', id: 2507, max: 25 },
        { key: 'reputation-maruukcentaur', type: 'reputation-renown', name: 'Maruuk Centaur', id: 2503, max: 25 },
        { key: 'reputation-iskaaratuskarr', type: 'reputation-renown', name: 'Iskaara Tuskarr', id: 2511, max: 30 },
        { key: 'reputation-valdrakkenaccord', type: 'reputation-renown', name: 'Valdrakken Accord', id: 2510, max: 30 },
        { key: 'reputation-loammniffen', type: 'reputation-renown', name: 'Loamm Niffen', id: 2564, max: 20 },
        { key: 'reputation-dreamwardens', type: 'reputation-renown', name: 'Dream Wardens', id: 2574, max: 20 },

        { key: 'professions', name: 'Professions', type: 'header', level: 0 },

        { key: 'dragonisles-herbalism', type: 'profession-primary', name: 'Dragon Isles Herbalism', id: 2832 },
        { key: 'dragonisles-mining', type: 'profession-primary', name: 'Dragon Isles Mining', id: 2833 },
        { key: 'dragonisles-skinning', type: 'profession-primary', name: 'Dragon Isles Skinning', id: 2834 },
        { key: 'dragonisles-tailoring', type: 'profession-primary', name: 'Dragon Isles Tailoring', id: 2831 },
        { key: 'dragonisles-enchanting', type: 'profession-primary', name: 'Dragon Isles Enchanting', id: 2825 },
        { key: 'dragonisles-engineering', type: 'profession-primary', name: 'Dragon Isles Engineering', id: 2827 },
        { key: 'dragonisles-inscription', type: 'profession-primary', name: 'Dragon Isles Inscription', id: 2828 },
        { key: 'dragonisles-alchemy', type: 'profession-primary', name: 'Dragon Isles Alchemy', id: 2823 },
        { key: 'dragonisles-jewelcrafting', type: 'profession-primary', name: 'Dragon Isles Jewelcrafting', id: 2829 },
        { key: 'dragonisles-leatherworking', type: 'profession-primary', name: 'Dragon Isles Leatherworking', id: 2830 },
        { key: 'dragonisles-blacksmithing', type: 'profession-primary', name: 'Dragon Isles Blacksmithing', id: 2822 },

        { key: 'dragonisles-cooking', type: 'profession-secondary', name: 'Dragon Isles Cooking', id: 2824 },
        { key: 'dragonisles-fishing', type: 'profession-secondary', name: 'Dragon Isles Fishing', id: 2826 },

        { key: 'exploration', name: 'Exploration', type: 'header', level: 0 },
        
        { key: 'exploration-wakingshores', type: 'achievement', name: 'Explore the Waking Shores', id: 16400 },
        { key: 'exploration-ohnaranplains', type: 'achievement', name: 'Explore the Ohn\'ahran Plains', id: 16457 },
        { key: 'exploration-azurespan', type: 'achievement', name: 'Explore the Azure Span', id: 16460 },
        { key: 'exploration-thaldraszus', type: 'achievement', name: 'Explore Thaldraszus', id: 16518 },
        { key: 'exploration-forbiddenreach', type: 'achievement', name: 'Explore the Forbidden Reach', id: 17534 },
        { key: 'exploration-zaralekcavern', type: 'achievement', name: 'Explore Zaralek Cavern', id: 17766 },
        { key: 'exploration-emeralddream', type: 'achievement', name: 'Explore the Emerald Dream', id: 19309 },
    ],
};

export {
    data,
};
