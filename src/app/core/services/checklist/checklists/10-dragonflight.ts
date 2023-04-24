import { Checklist } from '../checklist.interface';

const data: Checklist = {
    id: 'dragonflight',
    items: [
        { key: 'leveling', name: 'Leveling', type: 'header', level: 0 },

        { key: 'leveling-wakingshores', name: 'The Waking Shores', type: 'header', level: 1 },
        { key: 'leveling-wakingshores-wakinghope', name: 'Waking Hope', type: 'achievement', id: 16334 },

        { key: 'leveling-ohnahranplains', name: 'Ohn\'ahran Plains', type: 'header', level: 1 },
        { key: 'leveling-ohnahranplains-ohnaroll', name: 'Ohn\'a\'Roll', type: 'achievement', id: 15394 },

        { key: 'leveling-azurespan', name: 'The Azure Span', type: 'header', level: 1 },
        { key: 'leveling-azurespan-azurespanner', name: 'Azure Spanner', type: 'achievement', id: 16336 },

        { key: 'leveling-thaldraszus', name: 'Thaldraszus', type: 'header', level: 1 },
        { key: 'leveling-thaldraszus-spellit', name: 'Just Don\' Ask Me to Spell It', type: 'achievement', id: 16363 },

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
        { key: 'story-dragonflight-sparkofingenuity', name: 'The Spark of Ingenuity', type: 'quest', id: 70900 },

        { key: 'reputation', name: 'Reputation', type: 'header', level: 0 },
        { key: 'reputation-dragonscaleexpedition', type: 'reputation-renown', name: 'Dragon Scale Expedition', id: 2507, max: 25 },
        { key: 'reputation-maruukcentaur', type: 'reputation-renown', name: 'Maruuk Centaur', id: 2503, max: 25 },
        { key: 'reputation-iskaaratuskarr', type: 'reputation-renown', name: 'Iskaara Tuskarr', id: 2511, max: 30 },
        { key: 'reputation-valdrakkenaccord', type: 'reputation-renown', name: 'Valdraken Accord', id: 2510, max: 30 },

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
    ],
};

export {
    data,
};
