import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { flatMap, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { LocalForageService } from '../local-forage/local-forage.service';

import { EndpointData, Region, SecretResponse } from './battle-net.interface';

@Injectable({ providedIn: 'root' })
export class BattleNetService {
    private secretObservable: { [ region in Region ]: Observable<EndpointData<SecretResponse>> } = {
        us: undefined,
        eu: undefined,
        tw: undefined,
        kr: undefined,
        cn: undefined,
    };

    constructor(
        private http: HttpClient,
        private localForageService: LocalForageService,
    ) {

    }

    getSecret(region: Region): Observable<EndpointData<SecretResponse>> {
        if (!this.secretObservable[region]) {
            const url = `${environment.tokenEndpoint}/${region}`;

            this.secretObservable[region] = this.http.get<EndpointData<SecretResponse>>(url).pipe(shareReplay(1));
        }

        return this.secretObservable[region];
    }

    getBaseUrl(region: Region): string {
        if (region === 'cn') {
            return 'https://gateway.battlenet.com.cn';
        }
        return `https://${region}.api.blizzard.com`;
    }

    requestWithCache<T>(
        url: string,
        region: Region,
        realm: string,
        characterName: string,
        cacheIdentifier: string,
        cached: boolean = false,
        requestType: 'json' | 'jsonp',
    ): Observable<T> {
        const cacheKey = `character-${region}-${realm}-${characterName}-${cacheIdentifier}`;

        let cache$: Observable<T | undefined> = of(undefined);
        if (cached) {
            cache$ = this.localForageService.get(cacheKey);
        }

        return cache$.pipe(
            flatMap(cachedData => {
                if (cachedData) {
                    return of(cachedData);
                }

                return this.getSecret(region).pipe(
                    flatMap(secret => {
                        const fullUrl = `${url}&access_token=${secret.result.access_token}`;
                        if (requestType === 'jsonp') {
                            return this.http.jsonp<T>(fullUrl, 'jsonp');
                        } else if (requestType === 'json') {
                            return this.http.get<T>(fullUrl);
                        }
                    }),
                    tap(character => {
                        this.localForageService.set(cacheKey, character);
                    }),
                );
            }),
        );
    }
}
