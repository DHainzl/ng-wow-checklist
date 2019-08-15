import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LocalForageService } from '../../local-forage/local-forage.service';
import { Region } from '../battle-net.interface';
import { BattleNetService } from '../battle-net.service';

import { BattleNetCharacter } from './character.interface';
import { BattleNetAchievements } from './types/battlenet-achievement';
import { BattleNetEquipment } from './types/battlenet-equipment';
import { BattleNetMedia } from './types/battlenet-media';
import { BattleNetProfile } from './types/battlenet-profile';

@Injectable({ providedIn: 'root' })
export class BattleNetCharacterService {
    constructor(
        private bnetService: BattleNetService,
        private localForageService: LocalForageService,
    ) { }

    public getCharacter(
        region: Region,
        realm: string,
        characterName: string,
        fields: string[],
        cached: boolean = false,
    ): Observable<BattleNetCharacter> {
        const baseUrl =  `${this.bnetService.getBaseUrl(region)}/wow/character/${realm}/${characterName}`;
        const url = `${baseUrl}?locale=en_US&fields=${fields.join(',')}`;

        return this.bnetService.requestWithCache(url, region, realm, characterName, fields.join(','), cached, 'jsonp');
    }

    public getAchievement(region: Region, realm: string, characterName: string, cached: boolean = true): Observable<BattleNetAchievements> {
        return this.getFromProfileAPI(region, realm, characterName, cached, '/achievements');
    }

    public getEquipment(region: Region, realm: string, characterName: string, cached: boolean = true): Observable<BattleNetEquipment> {
        return this.getFromProfileAPI(region, realm, characterName, cached, '/equipment');
    }

    public getMedia(region: Region, realm: string, characterName: string, cached: boolean = true): Observable<BattleNetMedia> {
        return this.getFromProfileAPI(region, realm, characterName, cached, '/character-media');
    }

    public getProfile(region: Region, realm: string, characterName: string, cached: boolean = true): Observable<BattleNetProfile> {
        return this.getFromProfileAPI(region, realm, characterName, cached, '');
    }

    private getFromProfileAPI<T>(region: Region, realm: string, characterName: string, cached: boolean, endpoint: string): Observable<T> {
        const baseUrl =  `${this.bnetService.getBaseUrl(region)}/profile/wow/character/${realm}/${characterName}${endpoint}`;
        const url = `${baseUrl}?namespace=profile-${region}&locale=en_US`;

        return this.bnetService.requestWithCache(url, region, realm, characterName, endpoint, cached, 'json');
    }

    public clearCache(): Observable<void[]> {
        return this.localForageService.clearKeysStartingWith('character-');
    }

}
