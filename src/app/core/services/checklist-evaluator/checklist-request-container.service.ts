import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, merge, Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Region } from '../battle-net/battle-net.interface';
import { BattleNetCharacterService } from '../battle-net/character/character.service';
import { BattleNetAchievements } from '../battle-net/character/types/battlenet-achievement';
import { BattleNetEquipment } from '../battle-net/character/types/battlenet-equipment';
import { BattleNetMedia } from '../battle-net/character/types/battlenet-media';
import { BattleNetProfessions } from '../battle-net/character/types/battlenet-profession';
import { BattleNetProfile } from '../battle-net/character/types/battlenet-profile';
import { BattleNetQuests } from '../battle-net/character/types/battlenet-quest';
import { BattleNetCharacterReputations } from '../battle-net/character/types/battlenet-reputation';
import { CharacterInfo, CharacterIngameData } from '../character-store/character-store.interface';
import { CharacterStoreService } from '../character-store/character-store.service';

export interface CharacterId {
    region: Region;
    realm: string;
    name: string;
}

@Injectable({ providedIn: 'root' })
export class ChecklistRequestContainerService {
    private _characterChanged$: BehaviorSubject<CharacterId | undefined> = new BehaviorSubject<CharacterId | undefined>(undefined);
    private _questsChanged$: BehaviorSubject<BattleNetQuests | undefined> = new BehaviorSubject<BattleNetQuests | undefined>(undefined);
    private _professionsChanged$: BehaviorSubject<BattleNetProfessions | undefined> = new BehaviorSubject<BattleNetProfessions | undefined>(undefined);
    private _reputationChanged$: BehaviorSubject<BattleNetCharacterReputations | undefined> = new BehaviorSubject<BattleNetCharacterReputations | undefined>(undefined);
    private _achievementsChanged$: BehaviorSubject<BattleNetAchievements | undefined> = new BehaviorSubject<BattleNetAchievements | undefined>(undefined);
    private _equipmentChanged$: BehaviorSubject<BattleNetEquipment | undefined> = new BehaviorSubject<BattleNetEquipment | undefined>(undefined);
    private _mediaChanged$: BehaviorSubject<BattleNetMedia | undefined> = new BehaviorSubject<BattleNetMedia | undefined>(undefined);
    private _profileChanged$: BehaviorSubject<BattleNetProfile | undefined> = new BehaviorSubject<BattleNetProfile | undefined>(undefined);
    private _characterInfo$: BehaviorSubject<CharacterInfo[]> = new  BehaviorSubject<CharacterInfo[]> ([]);
    private _ingameDataChanged$: BehaviorSubject<CharacterIngameData | undefined> = new BehaviorSubject<CharacterIngameData | undefined>(undefined);

    get characterChanged(): Observable<CharacterId | undefined> { return this._characterChanged$.asObservable(); }
    get questsChanged(): Observable<BattleNetQuests | undefined> { return this._questsChanged$.asObservable(); }
    get professionsChanged(): Observable<BattleNetProfessions | undefined> { return this._professionsChanged$.asObservable(); }
    get reputationChanged(): Observable<BattleNetCharacterReputations | undefined> { return this._reputationChanged$.asObservable(); }
    get achievementsChanged(): Observable<BattleNetAchievements | undefined> { return this._achievementsChanged$.asObservable(); }
    get equipmentChanged(): Observable<BattleNetEquipment | undefined> { return this._equipmentChanged$.asObservable(); }
    get mediaChanged(): Observable<BattleNetMedia | undefined> { return this._mediaChanged$.asObservable(); }
    get profileChanged(): Observable<BattleNetProfile | undefined> { return this._profileChanged$.asObservable(); }
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
            map(x => x.overrides),
        );
    }
    get ingameDataChanged(): Observable<CharacterIngameData | undefined> { return this._ingameDataChanged$.asObservable(); }

    constructor(
        private characterService: BattleNetCharacterService,
        private characterStoreService: CharacterStoreService,
    ) { }

    load(region: Region, realm: string, name: string, characterInfo: CharacterInfo, cached: boolean = false): Observable<undefined> {
        this._characterChanged$.next({
            region, realm, name,
        });
        this._characterInfo$.next([ characterInfo ]);
        this._ingameDataChanged$.next(this.characterStoreService.getIngameData(region, realm, name));

        this._questsChanged$.next(undefined);
        this._professionsChanged$.next(undefined);
        this._reputationChanged$.next(undefined);
        this._achievementsChanged$.next(undefined);
        this._equipmentChanged$.next(undefined);
        this._mediaChanged$.next(undefined);
        this._profileChanged$.next(undefined);

        const achievement$ = this.characterService.getAchievement(region, realm, name, cached).pipe(
            tap(achievements => this._achievementsChanged$.next(achievements)),
        );
        const equipment$ = this.characterService.getEquipment(region, realm, name, cached).pipe(
            tap(equipment => this._equipmentChanged$.next(equipment)),
        );
        const media$ = this.characterService.getMedia(region, realm, name, cached).pipe(
            catchError(() => of(undefined)),
            tap(media => this._mediaChanged$.next(media)),
        );
        const profile$ = this.characterService.getProfile(region, realm, name, cached).pipe(
            tap(profile => this._profileChanged$.next(profile)),
            tap(profile => this._mediaChanged$.next(this.characterService.getMediaMock(region, profile))),
        );
        const reputation$ = this.characterService.getReputations(region, realm, name, cached).pipe(
            tap(reputations => this._reputationChanged$.next(reputations)),
        );
        const completedQuests$ = this.characterService.getCompletedQuests(region, realm, name, cached).pipe(
            tap(quests => this._questsChanged$.next(quests)),
        );
        const professions$ = this.characterService.getProfessions(region, realm, name, cached).pipe(
            tap(professions => this._professionsChanged$.next(professions)),
        );

        return forkJoin([ achievement$, equipment$, media$, profile$, reputation$, completedQuests$, professions$ ]).pipe(
            map(() => undefined),
        );
    }
}
