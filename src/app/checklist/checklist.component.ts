import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Region } from '../services/battle-net/battle-net.interface';
import { BattleNetCharacterService } from '../services/battle-net/character/character.service';
import { CharacterInfo } from '../services/character-store/character-store.interface';
import { CharacterStoreService } from '../services/character-store/character-store.service';
import { AllCharacterData, EvaluatedChecklistItem } from '../services/checklist-evaluator/checklist-evaluator.interface';
import { ChecklistEvaluatorService } from '../services/checklist-evaluator/checklist-evaluator.service';
import { Checklist } from '../services/checklist/checklist.interface';
import { ChecklistService } from '../services/checklist/checklist.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
    selector: 'app-checklist',
    templateUrl: './checklist.component.html',
    styleUrls: [ './checklist.component.scss' ],
})
export class ChecklistComponent implements OnInit {
    private static readonly FIELDS = [ 'reputation', 'quests', 'professions' ];

    loading: boolean = true;
    error: string = '';

    region: Region;
    realm: string;
    name: string;

    hideCompleted: boolean = this.localStorageService.get('hideCompleted') || false;

    allCharacters: CharacterInfo[];
    private checklist: Checklist;
    characterInfo: CharacterInfo;
    characterData: AllCharacterData;
    evaluatedChecklist: EvaluatedChecklistItem[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private characterService: BattleNetCharacterService,
        private checklistService: ChecklistService,
        private characterStoreService: CharacterStoreService,
        private checklistEvaluatorService: ChecklistEvaluatorService,
        private localStorageService: LocalStorageService,

        private titleService: Title,
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle(`WoW Checklist`);

        this.activatedRoute.params.subscribe(params => {
            this.region = params.region;
            this.realm = params.realm;
            this.name = params.name;

            this.loadData();
        });
    }

    refresh(): void {
        this.loadData(false);
    }

    private loadData(cached: boolean = true): void {
        this.loading = true;

        this.characterStoreService.getCharacters().subscribe(characters => {
            this.allCharacters = characters;
        });

        this.characterStoreService.getCharacter(this.region, this.realm, this.name).pipe(
            flatMap(characterInfo => {
                this.characterInfo = characterInfo;
                return this.checklistService.getChecklist(characterInfo.checklistId);
            }),
            flatMap(checklist => {
                this.checklist = checklist;
                return forkJoin(
                    this.characterService.getCharacter(this.region, this.realm, this.name, ChecklistComponent.FIELDS, cached),
                    this.characterService.getAchievement(this.region, this.realm, this.name, cached),
                    this.characterService.getEquipment(this.region, this.realm, this.name, cached),
                    this.characterService.getMedia(this.region, this.realm, this.name, cached),
                    this.characterService.getProfile(this.region, this.realm, this.name, cached),
                );
            }),
        )
        .subscribe(
            ([ characterData, achievements, equipment, media, profile ]) => {
                this.characterData = {
                    mainCharacter: characterData,
                    achievements,
                    equipment,
                    media,
                    profile,
                };

                this.evaluatedChecklist = this.checklistEvaluatorService
                    .evaluateChecklist(this.checklist.items, this.characterData, this.characterInfo.overrides);

                // tslint:disable-next-line:max-line-length
                const title = `${this.characterData.profile.name} @ ${this.region.toUpperCase()}-${this.characterData.profile.realm.name} :: WoW Checklist`;
                this.titleService.setTitle(title);
                this.loading = false;
            },
            error => {
                this.error = error;
                this.loading = false;
            },
        );
    }

    hideCompletedChange(value: boolean): void {
        this.localStorageService.set('hideCompleted', value);
    }
}
