import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LocalForageService } from '../../local-forage/local-forage.service';
import { Region } from '../battle-net.interface';
import { CachedRequestService } from '../cached-request.service';

import { BattleNetCharacter } from './character.interface';
import { BattleNetAchievements } from './types/battlenet-achievement';
import { BattleNetEquipment } from './types/battlenet-equipment';
import { BattleNetMedia } from './types/battlenet-media';
import { BattleNetProfile } from './types/battlenet-profile';

@Injectable({ providedIn: 'root' })
export class BattleNetCharacterService {
    constructor(
        private cachedRequestService: CachedRequestService,
        private localForageService: LocalForageService,
    ) { }

    public getCharacter(
        region: Region,
        realm: string,
        characterName: string,
        cached: boolean = false,
    ): Observable<BattleNetCharacter> {
        return this.getCharacterData(region, realm, characterName, cached, '/community');
    }

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

    private getCharacterData<T>(region: Region, realm: string, characterName: string, cached: boolean, endpoint: string): Observable<T> {
        const url =  `${environment.backendUrl}/api/${region}/${realm}/${characterName}/profile${endpoint}`;
        const cacheKey = `character-${region}-${realm}-${characterName}-${endpoint}`;

        return this.cachedRequestService.requestWithCache(url, cacheKey, cached);
    }

    public clearCache(): Observable<void[]> {
        return this.localForageService.clearKeysStartingWith('character-');
    }

}
