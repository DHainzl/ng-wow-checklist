import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { from, groupBy, map, mergeMap, of, Subscription, tap, toArray, zip } from 'rxjs';
import { Region } from '../../../core/services/battle-net/battle-net.interface';
import { CharactersService } from '../../../core/services/battle-net/characters/characters.service';
import { BattleNetCharacterListEntry } from '../../../core/services/battle-net/characters/types/characters.interface';
import { CharacterInfo } from '../../../core/services/character-store/character-store.interface';
import { CharacterStoreService } from '../../../core/services/character-store/character-store.service';
import { ChecklistService } from '../../../core/services/checklist/checklist.service';

@Component({
    templateUrl: './add-character.component.html',
    styleUrls: [ './add-character.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,

        ReactiveFormsModule,
        UpperCasePipe,
    ]
})
export class AddCharacterComponent implements OnInit, OnDestroy {
    private readonly checklistService = inject(ChecklistService);
    private readonly DEFAULT_CHECKLIST = this.checklistService.getLatestChecklistId();

    readonly form = new FormGroup({
        region: new FormControl<Region>('us', [ Validators.required ]),
        character: new FormControl<BattleNetCharacterListEntry | undefined>(undefined, [ Validators.required ]),
    });

    readonly regions: Region[] = [ 'us', 'eu',  'kr', 'tw', 'cn' ];

    private readonly charactersLoading = signal<boolean>(true);
    private readonly charactersLoadingError = signal<boolean>(false);
    readonly charactersByRealm = signal<{ realm: string, characters: BattleNetCharacterListEntry[] }[]>([]);

    readonly characterLabel = computed(() => this.getCharacterLabel());

    private readonly subscriptions: Subscription = new Subscription();

    constructor(
        private dialogRef: MatDialogRef<AddCharacterComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CharacterInfo[],

        private charactersService: CharactersService,
        private characterStoreService: CharacterStoreService,
    ) { }

    ngOnInit(): void {
        this.subscriptions.add(this.form.controls.region.valueChanges.subscribe(newRegion => {
            this.loadCharacters(newRegion!);
        }));
        this.loadCharacters(this.form.controls.region.value!);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    close(result: boolean = false): void {
        this.dialogRef.close(result);
    }

    addCharacter(): void {
        const selected = this.form.controls.character.value;
        if (!selected) return this.close(false);

        const character = {
            region: this.form.controls.region.value!,
            name: selected.name.toLowerCase(),
            realm: selected.realm.slug,
            checklistId: this.DEFAULT_CHECKLIST,
            overrides: {},
        };

        this.characterStoreService.addCharacter(character).subscribe({
            next: () => this.close(true),
            error: error => alert('Could not add character: ' + error),
        });
    }

    private getCharacterLabel(): string {
        if (!this.form.controls.region.value) {
            return 'Please select a region';
        }

        if (this.charactersLoading()) {
            return 'Loading character list ...';
        }

        if (this.charactersLoadingError()) {
            return 'Error loading characters (wrong region?)';
        }

        if (this.charactersByRealm().length === 0) {
            return 'No characters found';
        }

        return 'Character';
    }

    characterAdded(character: BattleNetCharacterListEntry): boolean {
        return this.data.some(c => {
            return c.region === this.form.controls.region.value
                && c.realm === character.realm.slug
                && c.name === character.name.toLowerCase();
        });
    }

    private loadCharacters(region: Region): void {
        if (!region) {
            return;
        }

        this.form.controls.character.setValue(undefined);
        this.charactersLoading.set(true);
        this.charactersLoadingError.set(false);
        this.charactersByRealm.set([]);

        this.charactersService.getCharacters(region).subscribe({
            next: characterList => {
                from(characterList.wow_accounts).pipe(
                    mergeMap(account => account.characters),
                    groupBy(character => character.realm.name),
                    mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
                    toArray(),
                    map(groups => groups.map(([ realm, characters ]) => ({ realm, characters }))),
                    map(groups => groups.sort((a, b) => b.characters.length - a.characters.length)),
                    tap(groups => groups.forEach(group => group.characters.sort((a, b) => a.name.localeCompare(b.name)))),
                ).subscribe(charactersByRealm => {
                    this.charactersByRealm.set(charactersByRealm);
                    this.charactersLoading.set(false);
                });
            },
            error: error => {
                this.charactersLoading.set(false);
                this.charactersLoadingError.set(true);
            },
        });
    }
}
