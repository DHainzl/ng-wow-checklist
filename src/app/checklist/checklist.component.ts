import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';

import { Region } from '../services/battle-net/battle-net.interface';
import { BattleNetCharacter } from '../services/battle-net/character/character.interface';
import { BattleNetCharacterService } from '../services/battle-net/character/character.service';
import { CharacterInfo } from '../services/character-store/character-store.interface';
import { CharacterStoreService } from '../services/character-store/character-store.service';
import { EvaluatedChecklistItem } from '../services/checklist-evaluator/checklist-evaluator.interface';
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
    private static readonly FIELDS = [ 'items', 'achievements', 'reputation', 'quests', 'professions' ];

    loading: boolean = true;
    error: string = '';

    region: Region = this.activatedRoute.snapshot.params.region;
    realm: string = this.activatedRoute.snapshot.params.realm;
    name: string = this.activatedRoute.snapshot.params.name;

    hideCompleted: boolean = this.localStorageService.get('hideCompleted') || false;

    private checklist: Checklist;
    characterInfo: CharacterInfo;
    characterData: BattleNetCharacter;
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
        this.loadData();
        this.titleService.setTitle(`WoW Checklist`);
    }

    refresh(): void {
        this.loadData(false);
    }

    private loadData(cached: boolean = true): void {
        this.loading = true;

        this.characterStoreService.getCharacter(this.region, this.realm, this.name).pipe(
            flatMap(characterInfo => {
                this.characterInfo = characterInfo;
                return this.checklistService.getChecklist(characterInfo.checklistId);
            }),
            flatMap(checklist => {
                this.checklist = checklist;
                return this.characterService.getCharacter(this.region, this.realm, this.name, ChecklistComponent.FIELDS, cached);
            }),
        )
        .subscribe(
            data => {
                this.characterData = data;

                this.evaluatedChecklist = this.checklistEvaluatorService
                    .evaluateChecklist(this.checklist.items, this.characterData, this.characterInfo.overrides);

                const title = `${this.characterData.name} @ ${this.region.toUpperCase()}-${this.characterData.realm} :: WoW Checklist`;
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
        console.log('uhm', value);
        this.localStorageService.set('hideCompleted', value);
    }
}
