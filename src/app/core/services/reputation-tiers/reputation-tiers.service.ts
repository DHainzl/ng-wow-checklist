import { Injectable } from "@angular/core";
import { defaultTier, tierList } from "./reputation-tiers.data";
import { ReputationTierList } from "./reputation-tiers.interface";

@Injectable({ providedIn: 'root' })
export class ReputationTiersService {
    // Tier List is hardcoded because we don't want to do a round trip character reputations => reputation faction => reputation tiers for each faction
    getTiers(factionId: number): ReputationTierList {
        const customTier = tierList.find(tier => tier.factions.includes(factionId));
        if (customTier) {
            return customTier.tiers;
        }

        return defaultTier;
    }
}