import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged, flatMap, map } from 'rxjs/operators';

import { Region } from '../../core/services/battle-net/battle-net.interface';
import { BattleNetEquipment } from '../../core/services/battle-net/character/types/battlenet-equipment';
import { BattleNetMedia } from '../../core/services/battle-net/character/types/battlenet-media';
import { BattleNetProfile } from '../../core/services/battle-net/character/types/battlenet-profile';
import { CharacterInfo } from '../../core/services/character-store/character-store.interface';
import { CharacterStoreService } from '../../core/services/character-store/character-store.service';
import { ChecklistHandlerService } from '../../core/services/checklist-evaluator/handlers/checklist-handler.service';
import { ChecklistItem } from '../../core/services/checklist/checklist.interface';
import { ChecklistService } from '../../core/services/checklist/checklist.service';
import { LocalStorageService } from '../../core/services/local-storage/local-storage.service';

import { ChecklistRequestContainerService } from './services/checklist-request-container.service';

@Component({
    selector: 'app-checklist',
    templateUrl: './checklist.component.html',
    styleUrls: [ './checklist.component.scss' ],
})
export class ChecklistComponent implements OnInit, OnDestroy {

    loading: boolean = true;
    error: string = '';

    region: Region;
    realm: string;
    name: string;

    allCompleted: boolean = false;
    hideCompleted: boolean = this.localStorageService.get('hideCompleted') || false;

    allCharacters: CharacterInfo[];
    checklist: ChecklistItem[];
    characterInfo: CharacterInfo;

    media: BattleNetMedia;
    profile: BattleNetProfile;
    equipment: BattleNetEquipment;

    private subscriptions: Subscription = new Subscription();

    constructor(
        private activatedRoute: ActivatedRoute,
        private checklistHandlerService: ChecklistHandlerService,
        private checklistRequestContainerService: ChecklistRequestContainerService,
        private checklistService: ChecklistService,
        private characterStoreService: CharacterStoreService,
        private localStorageService: LocalStorageService,

        private titleService: Title,
        private changeDetectorRef: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.region = params.region;
            this.realm = params.realm;
            this.name = params.name;

            this.loadData();
        });

        this.subscriptions.add(this.checklistRequestContainerService.mediaChanged.subscribe(media => this.media = media));
        this.subscriptions.add(this.checklistRequestContainerService.profileChanged.subscribe(profile => {
            this.profile = profile;

            if (!profile) {
                return;
            }

            const title = `${profile.name} @ ${this.region.toUpperCase()}-${profile.realm.name} :: WoW Checklist`;
            this.titleService.setTitle(title);
        }));
        this.subscriptions.add(this.checklistRequestContainerService.equipmentChanged.subscribe(equipment => this.equipment = equipment));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    refresh(): void {
        this.loadData(false);
    }

    private loadData(cached: boolean = true): void {
        this.loading = true;
        this.error = '';
        this.titleService.setTitle(`WoW Checklist`);

        this.characterStoreService.getCharacters().subscribe(characters => {
            this.allCharacters = characters;
        });

        this.characterStoreService.getCharacter(this.region, this.realm, this.name).pipe(
            flatMap(characterInfo => {
                this.characterInfo = characterInfo;

                return this.checklistRequestContainerService.load(this.region, this.realm, this.name, this.characterInfo, cached);
            }),
            flatMap(() => {
                this.loading = false;
                return this.checklistService.getChecklist(this.characterInfo.checklistId);
            }),
        ).subscribe(checklist => {
            this.loading = false;
            const completedChanged: Observable<boolean>[] = [];

            const items = checklist.items
                .filter(item => this.isInRightCovenant(item))

            items
                .forEach(item => {
                    item.handler = this.checklistHandlerService.getHandler(item, items);

                    const completedAndVisible$ = combineLatest([
                        item.handler.completed.pipe(distinctUntilChanged()),
                        item.handler.shown.pipe(distinctUntilChanged()),
                    ]).pipe(
                        map(([ completionStatus, isShown ]) => {
                            if (!isShown) {
                                return true;
                            }

                            return completionStatus === 'complete';
                        }),
                    );

                    completedChanged.push(completedAndVisible$);
                });

            this.subscriptions.add(combineLatest(completedChanged).pipe(
                map(completionStatus => completionStatus.every(status => status)),
                distinctUntilChanged(),
            ).subscribe(allCompleted => {
                this.allCompleted = allCompleted;
                this.changeDetectorRef.detectChanges();
            }));

            this.checklist = items;
        },
        error => {
            this.error = error;
        });
    }

    hideCompletedChange(value: boolean): void {
        this.localStorageService.set('hideCompleted', value);
    }

    private isInRightCovenant(item: ChecklistItem): boolean {
        if (!item.covenant) {
            return true;
        }

        if (!this.profile) {
            return false;
        }

        return item.covenant === this.profile.covenant_progress?.chosen_covenant?.name;
    }
}
