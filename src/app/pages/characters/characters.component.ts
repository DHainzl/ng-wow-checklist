import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

import { BattleNetCharacterService } from '../../core/services/battle-net/character/character.service';
import { CharacterInfo } from '../../core/services/character-store/character-store.interface';
import { CharacterStoreService } from '../../core/services/character-store/character-store.service';
import { LocalStorageService } from '../../core/services/local-storage/local-storage.service';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddCharacterComponent } from './add-character/add-character.component';
import { CharacterLineComponent } from "./character-line/character-line.component";

@Component({
    selector: 'app-characters',
    templateUrl: './characters.component.html',
    styleUrls: [ './characters.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,

        CharacterLineComponent,
    ],
})
export class CharactersComponent implements OnInit {
    readonly loading = signal<boolean>(true);
    readonly characterData = signal<CharacterInfo[]>([]);

    constructor(
        private characterService: BattleNetCharacterService,
        private characterStoreService: CharacterStoreService,
        private localStorageService: LocalStorageService,
        private dialog: MatDialog,
        private titleService: Title,
    ) { }

    ngOnInit(): void {
        this.fetch();
        this.titleService.setTitle('Characters');
    }

    refresh(): void {
        this.characterService.clearCache().subscribe(() => this.fetch());
    }

    fetch(): void {
        this.loading.set(true);
        this.characterData.set([]);

        this.characterStoreService.getCharacters().subscribe({
            next: characters => {
                this.loading.set(false);
                this.characterData.set(characters);
            },
            // TODO Error handling
        });
    }

    openAddModal(): void {
        const dialogRef = this.dialog.open(AddCharacterComponent, {
            width: '400px',
            data: this.characterData(),
        });

        dialogRef.afterClosed().subscribe(hasChanged => {
            if (hasChanged) {
                this.fetch();
            }
        });
    }

    setupTestData(): void {
        this.localStorageService.set('characters', [
            { region: 'eu', realm: 'antonidas', name: 'hoazl', checklistId: 'bfa-alliance', overrides: {
                'reputation-championsofazeroth': { type: 'reputation', max: 7 },
                'reputation-orderofembers': { type: 'reputation', max: 7 },
                'reputation-proudmooreadmiralty': { type: 'reputation', max: 7 },
                'reputation-stormswake': { type: 'reputation', max: 7 },
                'reputation-tortollanseekers': { type: 'reputation', max: 7 },
                'reputation-wavebladeankoan': { type: 'reputation', max: 7 },
                'reputation-rustbolt': { type: 'reputation', max: 7 },
                'kultiran-cooking': { type: 'profession-secondary', enabled: true },
                'kultiran-fishing': { type: 'profession-secondary', enabled: true },
                'kultiran-archaeology': { type: 'profession-secondary', enabled: true },
            } },
            { region: 'eu', realm: 'antonidas', name: 'thórn', checklistId: 'bfa-alliance', overrides: {} },
            { region: 'eu', realm: 'antonidas', name: 'harenya', checklistId: 'bfa-alliance', overrides: {
                'reputation-rustbolt': { type: 'reputation', max: 7 },
            } },
            { region: 'eu', realm: 'antonidas', name: 'jamik', checklistId: 'bfa-alliance', overrides: {} },
            { region: 'eu', realm: 'antonidas', name: 'maerwen', checklistId: 'bfa-alliance', overrides: {} },
            { region: 'eu', realm: 'antonidas', name: 'bastrik', checklistId: 'bfa-alliance', overrides: {} },
            { region: 'eu', realm: 'antonidas', name: 'cerulia', checklistId: 'bfa-alliance', overrides: {} },
            { region: 'eu', realm: 'antonidas', name: 'jaspia', checklistId: 'bfa-alliance', overrides: {} },
            { region: 'eu', realm: 'antonidas', name: 'ametho', checklistId: 'bfa-alliance', overrides: {} },
            { region: 'eu', realm: 'antonidas', name: 'emeraldia', checklistId: 'bfa-alliance', overrides: {} },
            { region: 'eu', realm: 'antonidas', name: 'rhoren', checklistId: 'bfa-alliance', overrides: {} },
            { region: 'eu', realm: 'antonidas', name: 'tanzanon', checklistId: 'bfa-alliance', overrides: {} },
            { region: 'eu', realm: 'blackrock', name: 'andesina', checklistId: 'bfa-horde', overrides: {
                'reputation-zandalariempire': { type: 'reputation', max: 7 },
            } },
        ]);
        this.fetch();
    }
}
