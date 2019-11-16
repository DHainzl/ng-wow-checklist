import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { BackendService } from '../backend.service';
import { Region } from '../battle-net.interface';

import { CharacterListEntry } from './types/characters.interface';

@Injectable({ providedIn: 'root' })
export class CharactersService {
    constructor(
        private backendService: BackendService,
    ) { }

    public getCharacters(region: Region): Observable<CharacterListEntry[]> {
        const url = `${environment.backendUrl}/api/characters/${region}`;
        return this.backendService.getData<{ characters: CharacterListEntry[] }>(url).pipe(
            map(characters => characters.characters),
        );
    }
}
