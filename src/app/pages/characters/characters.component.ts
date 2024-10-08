import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { catchError, forkJoin, of } from 'rxjs';

import { BattleNetCharacterService } from '../../core/services/battle-net/character/character.service';
import { BattleNetEquipment } from '../../core/services/battle-net/character/types/battlenet-equipment';
import { BattleNetMedia } from '../../core/services/battle-net/character/types/battlenet-media';
import { BattleNetProfile } from '../../core/services/battle-net/character/types/battlenet-profile';
import { CharacterInfo } from '../../core/services/character-store/character-store.interface';
import { CharacterStoreService } from '../../core/services/character-store/character-store.service';
import { LocalStorageService } from '../../core/services/local-storage/local-storage.service';

import { AddCharacterComponent } from './add-character/add-character.component';

export interface CharacterDataForList {
    info: CharacterInfo;
    loading: boolean;
    error?: boolean;
    profile?: BattleNetProfile;
    media?: BattleNetMedia;
    equipment?: BattleNetEquipment;
}

@Component({
    selector: 'app-characters',
    templateUrl: './characters.component.html',
    styleUrls: [ './characters.component.scss' ],
})
export class CharactersComponent implements OnInit {
    readonly MAX_LEVEL = 80;
    readonly MAX_SECONDARY = 80;

    loading: boolean = true;

    characterData: CharacterDataForList[] = [];

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
        this.loading = true;
        this.characterData = [];

        this.characterStoreService.getCharacters().subscribe(characters => {
            this.loading = false;

            if (!characters.length) {
                return;
            }

            characters.forEach((c, idx) => {
                const characterData: CharacterDataForList = {
                    info: c,
                    loading: true,
                };

                this.characterData.push(characterData);

                forkJoin([
                    this.characterService.getProfile(c.region, c.realm, c.name, true),
                    this.characterService.getMedia(c.region, c.realm, c.name, true).pipe(
                        catchError(() => of(undefined)),
                    ),
                    this.characterService.getEquipment(c.region, c.realm, c.name, true),
                ]).subscribe({
                    next: ([ profile, media, equipment ]) => {
                        characterData.profile = profile;
                        characterData.media = media || this.characterService.getMediaMock(c.region, profile);
                        characterData.equipment = equipment;
                        characterData.loading = false;
                    },
                    error: error => {
                        characterData.error = true;
                        characterData.loading = false;
                    }
                });
            });
        });
    }

    openAddModal(): void {
        const dialogRef = this.dialog.open(AddCharacterComponent, {
            width: '400px',
            data: this.characterData,
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
