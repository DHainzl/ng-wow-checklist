import { Checklist } from '../checklist.interface';

const data: Checklist = {
    id: 'dragonflight',
    items: [
        { key: 'leveling', name: 'Leveling', type: 'header', level: 0 },

        { key: 'leveling-isleofdorn', name: 'Isle of Dorn', type: 'header', level: 1 },
        { key: 'leveling-isleofdorn-story-breakingpoint', name: 'Breaking Point', type: 'quest', id: 78536 },
        { key: 'leveling-isleofdorn-story-earthenfissures', name: 'Earthen Fissures', type: 'quest', id: 78471 },
        { key: 'leveling-isleofdorn-story-thefirstblow', name: 'The First Blow', type: 'quest', id: 78546 },

        { key: 'leveling-ringingdeeps', name: 'The Ringing Deeps', type: 'header', level: 1 },
        { key: 'leveling-ringingdeeps-story-bycandlelight', name: 'By Candlelight', type: 'quest', id: 80082 },
        { key: 'leveling-ringingdeeps-story-darkrevelation', name: 'Dark Revelation', type: 'quest', id: 78706 },
        { key: 'leveling-ringingdeeps-story-themonsterandthemachine', name: 'The Monster and the Machine', type: 'quest', id: 81689 },

        { key: 'leveling-hallowfall', name: 'Hallowfall', type: 'header', level: 1 },
        { key: 'leveling-hallowfall-story-theguidingstar', name: 'The Guiding Star', type: 'quest', id: 78671 },
        { key: 'leveling-hallowfall-story-gatheringshadows', name: 'Gathering Shadows', type: 'quest', id: 78954 },
        { key: 'leveling-hallowfall-story-hopeinsolidarity', name: 'Hope in Solidarity', type: 'quest', id: 78630 },

        { key: 'leveling-azjkahet', name: 'Azh-Kahet', type: 'header', level: 1 },
        { key: 'leveling-azjkahet-story-friendsinthedark', name: 'Friends in the Dark', type: 'quest', id: 78393 },
        { key: 'leveling-azjkahet-story-unravelingthetrapped', name: 'Unraveling the Trapped', type: 'quest', id: 78256 },
        { key: 'leveling-azjkahet-story-planswithinplans', name: 'Plans Within Plans', type: 'quest', id: 84022 },

        { key: 'leveling-general', name: 'General', type: 'header', level: 1 },
        { key: 'leveling-general-60', name: 'Level 70', type: 'level', max: 70 },
        { key: 'leveling-general-70', name: 'Level 80', type: 'level', max: 80 },

        { key: 'story', name: 'Story Quests', type: 'header', level: 0 },

        { key: 'story-warwithin', name: 'The War Within', type: 'header', level: 1 },
        { key: 'story-warwithin-againstthecurrent', name: 'Against the Current', type: 'quest', id: 79344 },
        { key: 'story-warwithin-tiesthatbind', name: 'Ties That Bind', type: 'quest', id: 79157 },
        { key: 'story-warwithin-newsfrombelow', name: 'News from Below', type: 'quest', id: 79244 },
        { key: 'story-warwithin-themachinesmarchtowar', name: 'The Machines March to War', type: 'quest', id: 79030 },
        { key: 'story-warwithin-alightinthedark', name: 'A Light in the Dark', type: 'quest', id: 0 },

        { key: 'professions', name: 'Professions', type: 'header', level: 0 },

        { key: 'warwithin-herbalism', type: 'profession-primary', name: 'Khaz Algar Herbalism', id: 2877 },
        { key: 'warwithin-mining', type: 'profession-primary', name: 'Khaz Algar Mining', id: 2881 },
        { key: 'warwithin-skinning', type: 'profession-primary', name: 'Khaz Algar Skinning', id: 2882 },
        { key: 'warwithin-tailoring', type: 'profession-primary', name: 'Khaz Algar Tailoring', id: 2883 },
        { key: 'warwithin-enchanting', type: 'profession-primary', name: 'Khaz Algar Enchanting', id: 2874 },
        { key: 'warwithin-engineering', type: 'profession-primary', name: 'Khaz Algar Engineering', id: 2875 },
        { key: 'warwithin-inscription', type: 'profession-primary', name: 'Khaz Algar Inscription', id: 2878 },
        { key: 'warwithin-alchemy', type: 'profession-primary', name: 'Khaz Algar Alchemy', id: 2871 },
        { key: 'warwithin-jewelcrafting', type: 'profession-primary', name: 'Khaz Algar Jewelcrafting', id: 2879 },
        { key: 'warwithin-leatherworking', type: 'profession-primary', name: 'Khaz Algar Leatherworking', id: 2880 },
        { key: 'warwithin-blacksmithing', type: 'profession-primary', name: 'Khaz Algar Blacksmithing', id: 2872 },

        { key: 'warwithin-cooking', type: 'profession-secondary', name: 'Khaz Algar Cooking', id: 2873 },
        { key: 'warwithin-fishing', type: 'profession-secondary', name: 'Khaz Algar Fishing', id: 2876 },
    ],
};

export {
    data,
};
