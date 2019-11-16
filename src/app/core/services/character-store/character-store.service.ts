import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';

import { Region } from '../battle-net/battle-net.interface';
import { LocalStorageService } from '../local-storage/local-storage.service';

import { CharacterInfo } from './character-store.interface';

@Injectable({ providedIn: 'root' })
export class CharacterStoreService {
    private _charactersChanged$: BehaviorSubject<CharacterInfo[]> = new BehaviorSubject(undefined);

    get charactersChanged(): Observable<CharacterInfo[]> { return this._charactersChanged$.asObservable(); }

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
        const character = characters.find(c => {
            return c.region === region.toLocaleLowerCase() && c.realm === realm.toLocaleLowerCase() && c.name === name.toLocaleLowerCase();
        });

        if (!character) {
            return throwError(`Could not find character ${name}@${region}-${realm}!`);
        }

        return of(character);
    }

    addCharacter(character: CharacterInfo): Observable<undefined> {
        return this.getCharacters().pipe(
            tap(allCharacters => allCharacters.push(character)),
            flatMap(allCharacters => this.setCharacters(allCharacters)),
        );
    }

    setCharacters(characters: CharacterInfo[]): Observable<undefined> {
        this.localStorage.set('characters', characters);
        this._charactersChanged$.next(characters);
        return of(undefined);
    }

    setCharacter(character: CharacterInfo): Observable<undefined> {
        return this.getCharacters().pipe(
            flatMap(allCharacters => {
                const idx = allCharacters
                    .findIndex(c => c.region === character.region && c.realm === character.realm && c.name === character.name);

                if (idx === -1) {
                    allCharacters.push(character);
                } else {
                    allCharacters[idx] = character;
                }

                return this.setCharacters(allCharacters);
            }),
        );
    }
}
