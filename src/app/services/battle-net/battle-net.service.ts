import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
}
