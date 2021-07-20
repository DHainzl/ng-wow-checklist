import { ReputationTierList } from "./reputation-tiers.interface";

export interface FactionToTier {
    factions: number[];
    tiers: ReputationTierList;
}

export const tierList: FactionToTier[] = [
    {
        factions: [
            2432,       // Ve'nari
        ],
        tiers: {
            "_links": {
                "self": {
                    "href": "https://us.api.blizzard.com/data/wow/reputation-tiers/366?namespace=static-9.1.0_39069-us"
                }
            },
            "id": 366,
            "tiers": [
                {
                    "name": "Dubious",
                    "min_value": 0,
                    "max_value": 1000,
                    "id": 0
                },
                {
                    "name": "Apprehensive",
                    "min_value": 1000,
                    "max_value": 7000,
                    "id": 1
                },
                {
                    "name": "Tentative",
                    "min_value": 7000,
                    "max_value": 14000,
                    "id": 2
                },
                {
                    "name": "Ambivalent",
                    "min_value": 14000,
                    "max_value": 21000,
                    "id": 3
                },
                {
                    "name": "Cordial",
                    "min_value": 21000,
                    "max_value": 42000,
                    "id": 4
                },
                {
                    "name": "Appreciative",
                    "min_value": 42000,
                    "max_value": 42000,
                    "id": 5
                }
            ],
        }
    },
    {
        factions: [
            2472,           // The Archivist's Codex
        ],
        tiers: {
            "_links": {
                "self": {
                    "href": "https://us.api.blizzard.com/data/wow/reputation-tiers/393?namespace=static-9.1.0_39069-us"
                }
            },
            "id": 393,
            "tiers": [
                {
                    "name": "Tier 1",
                    "min_value": 0,
                    "max_value": 3000,
                    "id": 0
                },
                {
                    "name": "Tier 2",
                    "min_value": 3000,
                    "max_value": 7500,
                    "id": 1
                },
                {
                    "name": "Tier 3",
                    "min_value": 7500,
                    "max_value": 14000,
                    "id": 2
                },
                {
                    "name": "Tier 4",
                    "min_value": 14000,
                    "max_value": 25000,
                    "id": 3
                },
                {
                    "name": "Tier 5",
                    "min_value": 25000,
                    "max_value": 41000,
                    "id": 4
                },
                {
                    "name": "Tier 6",
                    "min_value": 41000,
                    "max_value": 41000,
                    "id": 5
                }
            ],
        }
    }
];

export const defaultTier: ReputationTierList = {
    "_links": {
        "self": {
            "href": "https://us.api.blizzard.com/data/wow/reputation-tiers/0?namespace=static-9.1.0_39069-us"
        }
    },
    "id": 0,
    "tiers": [
        {
            "name": "Hated",
            "min_value": -42000,
            "max_value": -6000,
            "id": 0
        },
        {
            "name": "Hostile",
            "min_value": -6000,
            "max_value": -3000,
            "id": 1
        },
        {
            "name": "Unfriendly",
            "min_value": -3000,
            "max_value": 0,
            "id": 2
        },
        {
            "name": "Neutral",
            "min_value": 0,
            "max_value": 3000,
            "id": 3
        },
        {
            "name": "Friendly",
            "min_value": 3000,
            "max_value": 9000,
            "id": 4
        },
        {
            "name": "Honored",
            "min_value": 9000,
            "max_value": 21000,
            "id": 5
        },
        {
            "name": "Revered",
            "min_value": 21000,
            "max_value": 42000,
            "id": 6
        },
        {
            "name": "Exalted",
            "min_value": 42000,
            "max_value": 42000,
            "id": 7
        }
    ]
};