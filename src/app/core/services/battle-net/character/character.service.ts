import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LocalForageService } from '../../local-forage/local-forage.service';
import { Region } from '../battle-net.interface';
import { CachedRequestService } from '../cached-request.service';

import { BattleNetAchievements } from './types/battlenet-achievement';
import { BattleNetEquipment } from './types/battlenet-equipment';
import { BattleNetMedia } from './types/battlenet-media';
import { BattleNetProfessions } from './types/battlenet-profession';
import { BattleNetProfile } from './types/battlenet-profile';
import { BattleNetQuests } from './types/battlenet-quest';
import { BattleNetCharacterReputations } from './types/battlenet-reputation';

@Injectable({ providedIn: 'root' })
export class BattleNetCharacterService {
    constructor(
        private cachedRequestService: CachedRequestService,
        private localForageService: LocalForageService,
    ) { }

    public getAchievement(region: Region, realm: string, characterName: string, cached: boolean = true): Observable<BattleNetAchievements> {
        return this.getCharacterData(region, realm, characterName, cached, '/achievements');
    }

    public getEquipment(region: Region, realm: string, characterName: string, cached: boolean = true): Observable<BattleNetEquipment> {
        return this.getCharacterData(region, realm, characterName, cached, '/equipment');
    }

    public getMedia(region: Region, realm: string, characterName: string, cached: boolean = true): Observable<BattleNetMedia> {
        return this.getCharacterData(region, realm, characterName, cached, '/character-media');
    }

    public getProfile(region: Region, realm: string, characterName: string, cached: boolean = true): Observable<BattleNetProfile> {
        return this.getCharacterData(region, realm, characterName, cached, '');
    }

    public getReputations(region: Region, realm: string, characterName: string, cached: boolean = true)
        : Observable<BattleNetCharacterReputations> {
        return this.getCharacterData(region, realm, characterName, cached, '/reputations');
    }

    public getCompletedQuests(region: Region, realm: string, characterName: string, cached: boolean = true)
        : Observable<BattleNetQuests> {
        return this.getCharacterData(region, realm, characterName, cached, '/quests/completed');
    }

    public getProfessions(region: Region, realm: string, characterName: string, cached: boolean = true)
        : Observable<BattleNetProfessions> {
        return this.getCharacterData(region, realm, characterName, cached, '/professions');
    }

    private getCharacterData<T>(region: Region, realm: string, characterName: string, cached: boolean, endpoint: string): Observable<T> {
        const url =  `${environment.backendUrl}/api/${region}/${realm}/${characterName}/profile${endpoint}`;
        const cacheKey = `character-${region}-${realm}-${characterName}-${endpoint}`;

        return this.cachedRequestService.requestWithCache(url, cacheKey, cached);
    }

    public clearCache(): Observable<void[]> {
        return this.localForageService.clearKeysStartingWith('character-');
    }

}
