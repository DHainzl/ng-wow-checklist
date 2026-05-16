import { Checklist } from '../checklist.interface';

const data: Checklist = {
    id: 'thewarwithin',
    items: [
        { key: 'leveling', name: 'Leveling', type: 'header', level: 0 },

        { key: 'leveling-eversong', name: 'Eversong in Reprise', type: 'header', level: 1 },
        { key: 'leveling-eversong-story-whispersinthetwilight', name: 'Whispers in the Twilight', type: 'quest', id: 86745 },
        { key: 'leveling-eversong-story-shadowfall', name: 'Shadowfall', type: 'quest', id: 86636 },
        { key: 'leveling-eversong-story-rippleeffects', name: 'Ripple Effects', type: 'quest', id: 86650 },

        { key: 'leveling-zulaman', name: 'For Zul\'Aman!', type: 'header', level: 1 },
        { key: 'leveling-zulaman-story-diswasourland', name: 'Dis Was Our Land', type: 'quest', id: 86652 },
        { key: 'leveling-zulaman-story-pathofdehashey', name: 'Path of de Hash\'ey', type: 'quest', id: 86666 },
        { key: 'leveling-zulaman-story-wherewarslumbers', name: 'Where War Slumbers', type: 'quest', id: 91958 },
        { key: 'leveling-zulaman-story-deamanineverdie', name: 'De Amani Never Die', type: 'quest', id: 91062 },

        { key: 'leveling-harandar', name: 'One Does Not Simply Walk Into Harandar', type: 'header', level: 1 },
        { key: 'leveling-harandar-story-ofcavesandcradles', name: 'Of Caves and Cradles', type: 'quest', id: 86944 },
        { key: 'leveling-harandar-story-callofthegoddess', name: 'Call of the Goddess', type: 'quest', id: 86890 },
        { key: 'leveling-harandar-story-emergence', name: 'Emergence', type: 'quest', id: 86898 },

        { key: 'leveling-voidstorm', name: 'Breaching The Voidstorm', type: 'header', level: 1 },
        { key: 'leveling-voidstorm-story-intotheabyss', name: 'Into the Abyss', type: 'quest', id: 86565 },
        { key: 'leveling-voidstorm-story-thenightsveil', name: 'The Night\'s Veil', type: 'quest', id: 86545 },
        { key: 'leveling-voidstorm-story-dawnofreckoning', name: 'Dawn of Reckoning', type: 'quest', id: 86522 },

        { key: 'leveling-arator', name: 'Arator\'s Journey', type: 'header', level: 1 },
        { key: 'leveling-arator-story-thepathoflight', name: 'The Path of Light', type: 'quest', id: 89338 },
        { key: 'leveling-arator-story-regretsofthepast', name: 'Regrets of the Past', type: 'quest', id: 86903 },

        { key: 'leveling-general', name: 'General', type: 'header', level: 1 },
        { key: 'leveling-general-80', name: 'Level 80', type: 'level', max: 80 },
        { key: 'leveling-general-90', name: 'Level 90', type: 'level', max: 90 },

        { key: 'story', name: 'Story Quests', type: 'header', level: 0 },

        { key: 'story-midnight', name: 'The War of Light and Shadow', type: 'header', level: 1 },
        { key: 'story-midnight-foothold', name: 'Foothold', type: 'quest', id: 88706 },
        { key: 'story-midnight-voidspire', name: 'The Voidspire', type: 'quest', id: 92520 },
        { key: 'story-midnight-gatheringoftheelves', name: 'Gathering of the Elves', type: 'quest', id: 88942 },
        { key: 'story-midnight-battleofthebridge', name: 'The Battle of the Bridge', type: 'quest', id: 88769 },
        { key: 'story-midnight-darkwell', name: 'The Darkwell', type: 'quest', id: 88710 },
        { key: 'story-midnight-dawnofanewwell', name: 'Dawn of a New Well', type: 'quest', id: 90867 },

        { key: 'professions', name: 'Professions', type: 'header', level: 0 },

        { key: 'midnight-herbalism', type: 'profession-primary', name: 'Midnight Herbalism', id: 2912 },
        { key: 'midnight-mining', type: 'profession-primary', name: 'Midnight Mining', id: 2916 },
        { key: 'midnight-skinning', type: 'profession-primary', name: 'Midnight Skinning', id: 2917 },
        { key: 'midnight-tailoring', type: 'profession-primary', name: 'Midnight Tailoring', id: 2918 },
        { key: 'midnight-enchanting', type: 'profession-primary', name: 'Midnight Enchanting', id: 2909 },
        { key: 'midnight-engineering', type: 'profession-primary', name: 'Midnight Engineering', id: 2910 },
        { key: 'midnight-inscription', type: 'profession-primary', name: 'Midnight Inscription', id: 2913 },
        { key: 'midnight-alchemy', type: 'profession-primary', name: 'Midnight Alchemy', id: 2906 },
        { key: 'midnight-jewelcrafting', type: 'profession-primary', name: 'Midnight Jewelcrafting', id: 2914 },
        { key: 'midnight-leatherworking', type: 'profession-primary', name: 'Midnight Leatherworking', id: 2915 },
        { key: 'midnight-blacksmithing', type: 'profession-primary', name: 'Midnight Blacksmithing', id: 2907 },

        { key: 'midnight-cooking', type: 'profession-secondary', name: 'Midnight Cooking', id: 2908 },
        { key: 'midnight-fishing', type: 'profession-secondary', name: 'Midnight Fishing', id: 2911 },
    ],
};

export {
    data
};

