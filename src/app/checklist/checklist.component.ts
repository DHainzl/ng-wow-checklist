import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BattleNetCharacterService } from '../services/battle-net/character/character.service';
import { CharacterStoreService } from '../services/character-store/character-store.service';
import { flatMap } from 'rxjs/operators';
import { CharacterInfo } from '../services/character-store/character-store.interface';
import { BattleNetCharacter } from '../services/battle-net/character/character.interface';
import { ChecklistService } from '../services/checklist/checklist.service';
import { Checklist, ChecklistItem } from '../services/checklist/checklist.interface';
import { ChecklistHandlerParams } from './handlers/_handler';
import { EvaluatedChecklistItem } from '../services/checklist-evaluator/checklist-evaluator.interface';
import { ChecklistEvaluatorService } from '../services/checklist-evaluator/checklist-evaluator.service';
import { Title } from '@angular/platform-browser';
import { Region } from '../services/battle-net/battle-net.interface';

@Component({
    selector: 'app-checklist',
    templateUrl: './checklist.component.html',
    styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {
    private static readonly FIELDS = [ 'items', 'achievements', 'reputation', 'quests', 'professions' ];

    loading: boolean = true;
    error: string = '';

    region: Region = this.activatedRoute.snapshot.params['region'];
    realm: string = this.activatedRoute.snapshot.params['realm'];
    name: string = this.activatedRoute.snapshot.params['name'];

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

        private titleService: Title,
    ) { }

    ngOnInit() {
        this.loadData();
        this.titleService.setTitle(`WoW Checklist`);
    }

    private loadData() {
        this.loading = true;

        this.characterStoreService.getCharacter(this.region, this.realm, this.name).pipe(
            flatMap(characterInfo => {
                this.characterInfo = characterInfo;
                return this.checklistService.getChecklist(characterInfo.checklistId);
            }),
            flatMap(checklist => {
                this.checklist = checklist;
                return this.characterService.getCharacter(this.region, this.realm, this.name, ChecklistComponent.FIELDS);
            }),
        )
        .subscribe(
            data => {
                this.characterData = data;

                this.evaluatedChecklist = this.checklistEvaluatorService.evaluateChecklist(this.checklist.items, this.characterData, this.characterInfo.overrides);

                this.titleService.setTitle(`${this.characterData.name} @ ${this.region.toUpperCase()}-${this.characterData.realm} :: WoW Checklist`);

                this.loading = false;
            },
            error => {
                this.error = error;
                this.loading = false;
            }
        )
    }
}
