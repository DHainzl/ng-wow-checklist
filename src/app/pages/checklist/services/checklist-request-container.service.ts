import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, merge, Observable } from 'rxjs';
import { filter, map, mapTo, pluck, tap } from 'rxjs/operators';
import { Region } from 'src/app/core/services/battle-net/battle-net.interface';
import { BattleNetCharacterProfessions } from 'src/app/core/services/battle-net/character/character.interface';
import { BattleNetCharacterService } from 'src/app/core/services/battle-net/character/character.service';
import { BattleNetAchievements } from 'src/app/core/services/battle-net/character/types/battlenet-achievement';
import { BattleNetEquipment } from 'src/app/core/services/battle-net/character/types/battlenet-equipment';
import { BattleNetMedia } from 'src/app/core/services/battle-net/character/types/battlenet-media';
import { BattleNetProfile } from 'src/app/core/services/battle-net/character/types/battlenet-profile';
import { BattleNetCharacterReputations } from 'src/app/core/services/battle-net/character/types/battlenet-reputation';
import { CharacterInfo } from 'src/app/core/services/character-store/character-store.interface';
import { CharacterStoreService } from 'src/app/core/services/character-store/character-store.service';

export interface CharacterId {
    region: Region;
    realm: string;
    name: string;
}

@Injectable({ providedIn: 'root' })
export class ChecklistRequestContainerService {
    private _characterChanged$: BehaviorSubject<CharacterId | undefined> = new BehaviorSubject(undefined);
    private _questsChanged$: BehaviorSubject<number[]> = new BehaviorSubject(undefined);
    private _professionsChanged$: BehaviorSubject<BattleNetCharacterProfessions> = new BehaviorSubject(undefined);
    private _reputationChanged$: BehaviorSubject<BattleNetCharacterReputations> = new BehaviorSubject(undefined);
    private _achievementsChanged$: BehaviorSubject<BattleNetAchievements> = new BehaviorSubject(undefined);
    private _equipmentChanged$: BehaviorSubject<BattleNetEquipment> = new BehaviorSubject(undefined);
    private _mediaChanged$: BehaviorSubject<BattleNetMedia> = new BehaviorSubject(undefined);
    private _profileChanged$: BehaviorSubject<BattleNetProfile> = new BehaviorSubject(undefined);
    private _characterInfo$: BehaviorSubject<CharacterInfo[]> = new BehaviorSubject([]);

    get characterChanged(): Observable<CharacterId | undefined> { return this._characterChanged$.asObservable(); }
    get questsChanged(): Observable<number[]> { return this._questsChanged$.asObservable(); }
    get professionsChanged(): Observable<BattleNetCharacterProfessions> { return this._professionsChanged$.asObservable(); }
    get reputationChanged(): Observable<BattleNetCharacterReputations> { return this._reputationChanged$.asObservable(); }
    get achievementsChanged(): Observable<BattleNetAchievements> { return this._achievementsChanged$.asObservable(); }
    get equipmentChanged(): Observable<BattleNetEquipment> { return this._equipmentChanged$.asObservable(); }
    get mediaChanged(): Observable<BattleNetMedia> { return this._mediaChanged$.asObservable(); }
    get profileChanged(): Observable<BattleNetProfile> { return this._profileChanged$.asObservable(); }
    get overridesChanged(): Observable<CharacterInfo['overrides']> {
        return merge(this._characterInfo$, this.characterStoreService.charactersChanged).pipe(
            map(characters => {
                const id = this._characterChanged$.value;
                if (!id || !characters) {
                    return undefined;
                }

                return characters.find(c => c.region === id.region && c.realm === id.realm && c.name === id.name);
            }),
            filter(character => {
                return !!character;
            }),
            pluck('overrides'),
        );
    }

    constructor(
        private characterService: BattleNetCharacterService,
        private characterStoreService: CharacterStoreService,
    ) { }

    load(region: Region, realm: string, name: string, characterInfo: CharacterInfo, cached: boolean = false): Observable<undefined> {
        this._characterChanged$.next({
            region, realm, name,
        });
        this._characterInfo$.next([ characterInfo ]);

        this._questsChanged$.next(undefined);
        this._professionsChanged$.next(undefined);
        this._reputationChanged$.next(undefined);
        this._achievementsChanged$.next(undefined);
        this._equipmentChanged$.next(undefined);
        this._mediaChanged$.next(undefined);
        this._profileChanged$.next(undefined);

        const character$ = this.characterService.getCharacter(region, realm, name, cached).pipe(
            tap(characterData => {
                this._questsChanged$.next(characterData.quests);
                this._professionsChanged$.next(characterData.professions);
            }),
        );
        const achievement$ = this.characterService.getAchievement(region, realm, name, cached).pipe(
            tap(achievements => this._achievementsChanged$.next(achievements)),
        );
        const equipment$ = this.characterService.getEquipment(region, realm, name, cached).pipe(
            tap(equipment => this._equipmentChanged$.next(equipment)),
        );
        const media$ = this.characterService.getMedia(region, realm, name, cached).pipe(
            tap(media => this._mediaChanged$.next(media)),
        );
        const profile$ = this.characterService.getProfile(region, realm, name, cached).pipe(
            tap(profile => this._profileChanged$.next(profile)),
        );
        const reputation$ = this.characterService.getReputations(region, realm, name, cached).pipe(
            tap(reputations => this._reputationChanged$.next(reputations)),
        );

        return forkJoin(character$, achievement$, equipment$, media$, profile$, reputation$).pipe(
            mapTo(undefined),
        );
    }
}
