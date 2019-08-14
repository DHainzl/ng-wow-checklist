import { Checklist } from '../checklist.interface';

const data: Checklist = {
    id: 'bfa-alliance',
    items: [
        { key: 'leveling', name: 'Leveling', type: 'header', id: 0, level: 0 },

        { key: 'leveling-general', name: 'General', type: 'header', id: 0, level: 1 },
        { key: 'leveling-general-110', name: 'Level 110', type: 'level', id: 0, max: 110 },
        { key: 'leveling-general-120', name: 'Level 120', type: 'level', id: 0, max: 120 },

        { key: 'wareffort', name: 'War Effort', type: 'header', id: 0, level: 0 },

        { key: 'wareffort-heartofazeroth', name: 'Heart of Azeroth', type: 'header', id: 0, level: 1 },
        { key: 'wareffort-heartofazeroth-heartforge', name: 'The Heart Forge', type: 'quest', id: 55618 },

        { key: 'wareffort-gear', name: 'Gear', type: 'header', id: 0, level: 1 },
        { key: 'wareffort-gear-310', name: 'iLvl 310 / Superior', type: 'item-level', id: 0, max: 310 },
        { key: 'wareffort-gear-385', name: 'iLvl 385 / Benthic', type: 'item-level', id: 0, max: 385 },

        { key: 'reputation', name: 'Reputation', type: 'header', id: 0, level: 0 },
        { key: 'reputation-championsofazeroth', type: 'reputation', name: 'Champions of Azeroth', id: 2164, max: 6 },
        { key: 'reputation-tortollanseekers', type: 'reputation', name: 'Tortollan Seekers', id: 2163, max: 6 },
        { key: 'reputation-rustbolt', type: 'reputation', name: 'Rustbolt Resistance', id: 2391, max: 6 },
    ],
};

export {
    data,
};
