import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { from, of, Subscription, throwError, zip } from 'rxjs';
import { filter, flatMap, groupBy, map, mergeMap, tap, toArray } from 'rxjs/operators';
import { Region } from 'src/app/core/services/battle-net/battle-net.interface';
import { CharactersService } from 'src/app/core/services/battle-net/characters/characters.service';
import { CharacterListEntry } from 'src/app/core/services/battle-net/characters/types/characters.interface';
import { CharacterStoreService } from 'src/app/core/services/character-store/character-store.service';

import { CharacterDataForList } from '../characters.component';

import { CharacterFactionService } from './character-faction.service';

@Component({
    templateUrl: './add-character.component.html',
    styleUrls: [ './add-character.component.scss' ],
})
export class AddCharacterComponent implements OnInit, OnDestroy {
    form: FormGroup = new FormGroup({
        region: new FormControl('us', [ Validators.required ]),
        character: new FormControl('', [ Validators.required ]),
    });

    regions: Region[] = [ 'us', 'eu',  'kr', 'tw', 'cn' ];

    private charactersLoading: boolean = true;
    charactersByRealm: { realm: string, characters: CharacterListEntry[] }[] = [];

    private subscriptions: Subscription = new Subscription();

    constructor(
        private dialogRef: MatDialogRef<AddCharacterComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CharacterDataForList[],

        private charactersService: CharactersService,
        private characterStoreService: CharacterStoreService,
        private characterFactionService: CharacterFactionService,
    ) { }

    ngOnInit(): void {
        this.subscriptions.add(this.form.get('region').valueChanges.subscribe(newRegion => {
            this.loadCharacters(newRegion);
        }));
        this.loadCharacters(this.form.get('region').value);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    close(result: boolean = false): void {
        this.dialogRef.close(result);
    }

    addCharacter(): void {
        const selected: CharacterListEntry = this.form.get('character').value;
        if (!selected) return this.close(false);

        this.characterFactionService.getFaction(selected.race).pipe(
            flatMap(faction => {
                if (faction === 'ALLIANCE') return of('bfa-alliance');
                if (faction === 'HORDE') return of('bfa-horde');
                return throwError('Unsupported faction ' + faction);
            }),
            map(checklistId => ({
                region: this.form.get('region').value,
                name: selected.name.toLowerCase(),
                realm: selected.realm.toLowerCase(),
                checklistId,
                overrides: {},
            })),
            flatMap(character => this.characterStoreService.addCharacter(character)),
        ).subscribe(() => {
            this.close(true);
        }, error => {
            // TODO Better error handling ...
            alert('Could not add character: ' + error);
        });
    }

    getCharacterLabel(): string {
        if (!this.form.get('region').value) {
            return 'Please select a region';
        }

        if (this.charactersLoading) {
            return 'Loading character list ...';
        }

        if (this.charactersByRealm.length === 0) {
            return 'No characters found';
        }

        return 'Character';
    }

    characterAdded(character: CharacterListEntry): boolean {
        return this.data.some(c => {
            return c.info.region === this.form.get('region').value
                && c.info.realm === character.realm.toLowerCase()
                && c.info.name === character.name.toLowerCase();
        });
    }

    private loadCharacters(region: Region): void {
        if (!region) {
            return;
        }

        this.form.get('character').setValue('');
        this.charactersLoading = true;

        this.charactersService.getCharacters(region).subscribe(characterList => {
            from(characterList).pipe(
                groupBy(character => character.realm),
                mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
                toArray(),
                map(groups => groups.map(group => ({ realm: group[0], characters: group[1] }))),
                map(groups => groups.sort((a, b) => b.characters.length - a.characters.length)),
                tap(groups => groups.forEach(group => group.characters.sort((a, b) => a.name.localeCompare(b.name)))),
            ).subscribe(charactersByRealm => {
                this.charactersByRealm = charactersByRealm;
                this.charactersLoading = false;
            });
        });
    }
}
