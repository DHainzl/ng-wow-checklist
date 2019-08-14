import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';

import { LocalForageService } from '../../local-forage/local-forage.service';
import { Region } from '../battle-net.interface';
import { BattleNetService } from '../battle-net.service';

import { BattleNetCharacter } from './character.interface';

@Injectable({ providedIn: 'root' })
export class BattleNetCharacterService {
    constructor(
        private bnetService: BattleNetService,
        private http: HttpClient,
        private localForageService: LocalForageService,
    ) { }

    public getCharacter(
        region: Region,
        realm: string,
        characterName: string,
        fields: string[],
        cached: boolean = false,
    ): Observable<BattleNetCharacter> {
        const cacheKey = `character-${region}-${realm}-${characterName}-${fields.join(',')}`;

        const baseUrl =  `${this.bnetService.getBaseUrl(region)}/wow/character/${realm}/${characterName}`;
        const url = `${baseUrl}?locale=en_US&fields=${fields.join(',')}`;

        let cache$: Observable<BattleNetCharacter | undefined> = of(undefined);
        if (cached) {
            cache$ = this.localForageService.get(cacheKey);
        }

        return cache$.pipe(
            flatMap(cachedData => {
                if (cachedData) {
                    return of(cachedData);
                }

                return this.bnetService.getSecret(region).pipe(
                    flatMap(secret => {
                        return this.http.jsonp<BattleNetCharacter>(`${url}&access_token=${secret.result.access_token}`, 'jsonp');
                    }),
                    tap(character => {
                        this.localForageService.set(cacheKey, character);
                    }),
                );
            }),
        );
    }

    public clearCache(): Observable<void[]> {
        return this.localForageService.clearKeysStartingWith('character-');
    }
}
