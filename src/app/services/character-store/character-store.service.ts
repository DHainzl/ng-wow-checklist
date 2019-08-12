import { Injectable } from "@angular/core";
import { Observable, of, throwError } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CharacterInfo } from './character-store.interface';
import { Region } from '../battle-net/battle-net.interface';

@Injectable({ providedIn: 'root' })
export class CharacterStoreService {
    constructor(
        private localStorage: LocalStorageService,
    ) { }

    getCharacters(): Observable<CharacterInfo[]> {
        const characters: CharacterInfo[] = this.localStorage.get('characters');
        if (!characters) { return of([]); }
        return of(characters);
    }

    getCharacter(region: Region, realm: string, name: string): Observable<CharacterInfo> {
        const characters: CharacterInfo[] = this.localStorage.get('characters');
        const character = characters.find(c => c.region === region.toLocaleLowerCase() && c.realm === realm.toLocaleLowerCase() && c.name === name.toLocaleLowerCase());

        if (!character) {
            return throwError(`Could not find character ${name}@${region}-${realm}!`);
        }

        return of(character);
    }
}