import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class CharacterService {
    // curl -u {client_id}:{client_secret} -d grant_type=client_credentials https://us.battle.net/oauth/token
    private readonly accessToken = 'REDACTED';

    constructor(
        private http: HttpClient,
    ) { }

    public getCharacter(region: string, realm: string, characterName: string, fields: string[]): Observable<any> {
        const baseUrl = `https://${region}.api.blizzard.com/wow/character/${realm}/${characterName}`;
        const url = `${baseUrl}?locale=en_US&access_token=${this.accessToken}&fields=${fields.join(',')}`;

        return this.http.jsonp(url, 'jsonp');
    }
}
