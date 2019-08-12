import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Region } from '../battle-net.interface';
import { BattleNetService } from '../battle-net.service';
import { BattleNetCharacter } from './character.interface';

@Injectable({ providedIn: 'root' })
export class BattleNetCharacterService {
    constructor(
        private bnetService: BattleNetService,
        private http: HttpClient,
    ) { }

    public getCharacter(region: Region, realm: string, characterName: string, fields: string[]): Observable<BattleNetCharacter> {
        return this.bnetService.getSecret(region).pipe(
            flatMap(secret => {
                const baseUrl = `${this.bnetService.getBaseUrl(region)}/wow/character/${realm}/${characterName}`;
                const url = `${baseUrl}?locale=en_US&access_token=${secret.result.access_token}&fields=${fields.join(',')}`;

                return this.http.jsonp<BattleNetCharacter>(url, 'jsonp');
            }),
        );
    }
}
