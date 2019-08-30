import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Region } from '../services/battle-net/battle-net.interface';
import { BattleNetEquipment } from '../services/battle-net/character/types/battlenet-equipment';
import { BattleNetMedia } from '../services/battle-net/character/types/battlenet-media';
import { BattleNetProfile } from '../services/battle-net/character/types/battlenet-profile';
import { CharacterInfo } from '../services/character-store/character-store.interface';
import { CharacterStoreService } from '../services/character-store/character-store.service';
import { ChecklistHandlerService } from '../services/checklist-evaluator/handlers/checklist-handler.service';
import { ChecklistItem } from '../services/checklist/checklist.interface';
import { ChecklistService } from '../services/checklist/checklist.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

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
        this.titleService.setTitle(`WoW Checklist`);

        this.characterStoreService.getCharacters().subscribe(characters => {
            this.allCharacters = characters;
        });

        this.characterStoreService.getCharacter(this.region, this.realm, this.name).pipe(
            flatMap(characterInfo => {
                this.characterInfo = characterInfo;

                this.checklistRequestContainerService.load(this.region, this.realm, this.name, this.characterInfo, cached).subscribe(() => {
                    this.loading = false;
                }, error => {
                    this.error = error;
                    this.loading = false;
                    return of();
                });

                return this.checklistService.getChecklist(characterInfo.checklistId);
            }),
        ).subscribe(checklist => {
            checklist.items.forEach(item => {
                item.handler = this.checklistHandlerService.getHandler(item, checklist.items);
            });

            this.checklist = checklist.items;
        },
        error => {
            this.error = error;
        });
    }

    hideCompletedChange(value: boolean): void {
        this.localStorageService.set('hideCompleted', value);
    }
}
