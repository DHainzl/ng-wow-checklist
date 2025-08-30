import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { Region } from '../battle-net/battle-net.interface';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CharacterInfo, CharacterIngameData } from './character-store.interface';

@Injectable({ providedIn: 'root' })
export class CharacterStoreService {
    private readonly localStorage = inject(LocalStorageService);

    private readonly _charactersChanged$: BehaviorSubject<CharacterInfo[]> = new BehaviorSubject<CharacterInfo[]>([]);

    get charactersChanged(): Observable<CharacterInfo[]> { return this._charactersChanged$.asObservable(); }

    getCharacters(): Observable<CharacterInfo[]> {
        const characters = this.localStorage.get<CharacterInfo[]>('characters');

        if (!characters) {
            this._charactersChanged$.next([]);
            return of([]);
        }

        this._charactersChanged$.next(characters);
        return of(characters);
    }

    getCharacter(region: Region, realm: string, name: string): Observable<CharacterInfo> {
        const characters = this.localStorage.get<CharacterInfo[]>('characters') ?? [];
        const character = characters.find(c => {
            return c.region === region.toLocaleLowerCase() && c.realm === realm.toLocaleLowerCase() && c.name === name.toLocaleLowerCase();
        });

        if (!character) {
            return throwError(() => new Error(`Could not find character ${name}@${region}-${realm}!`));
        }

        return of(character);
    }

    addCharacter(character: CharacterInfo): Observable<undefined> {
        return this.getCharacters().pipe(
            tap(allCharacters => allCharacters.push(character)),
            mergeMap(allCharacters => this.setCharacters(allCharacters)),
        );
    }

    setCharacters(characters: CharacterInfo[]): Observable<undefined> {
        this.localStorage.set('characters', characters);
        this._charactersChanged$.next(characters);
        return of(undefined);
    }

    setCharacter(character: CharacterInfo): Observable<undefined> {
        return this.getCharacters().pipe(
            mergeMap(allCharacters => {
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

    getIngameData(region: Region, realm: string, name: string): CharacterIngameData | undefined {
        const allData: CharacterIngameData[] = this.localStorage.get('ingame-data') || [];
        return allData
            .find(c => c.character.region === region && c.character.realm === realm && c.character.name === name);
    }

    setIngameData(ingameData: CharacterIngameData): void {
        let existingData: CharacterIngameData[] = this.localStorage.get('ingame-data') || [];

        ingameData.character.region = ingameData.character.region.toLocaleLowerCase();
        ingameData.character.realm = ingameData.character.realm.toLocaleLowerCase();
        ingameData.character.name = ingameData.character.name.toLocaleLowerCase();

        existingData = existingData
            .filter(c => !(c.character.region === ingameData.character.region &&
                c.character.realm === ingameData.character.realm &&
                c.character.name === ingameData.character.name));

        existingData.push(ingameData);

        this.localStorage.set('ingame-data', existingData);
    }
}
