import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { BattleNetCharacterService } from '../../core/services/battle-net/character/character.service';
import { BattleNetEquipment } from '../../core/services/battle-net/character/types/battlenet-equipment';
import { BattleNetMedia } from '../../core/services/battle-net/character/types/battlenet-media';
import { BattleNetProfile } from '../../core/services/battle-net/character/types/battlenet-profile';
import { CharacterInfo } from '../../core/services/character-store/character-store.interface';
import { CharacterStoreService } from '../../core/services/character-store/character-store.service';
import { LocalStorageService } from '../../core/services/local-storage/local-storage.service';

interface CharacterDataForList {
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
    loading: boolean = true;

    characterData: CharacterDataForList[] = [];

    constructor(
        private characterService: BattleNetCharacterService,
        private characterStoreService: CharacterStoreService,
        private localStorageService: LocalStorageService,
    ) { }

    ngOnInit(): void {
        this.fetch();
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

                forkJoin(
                    this.characterService.getProfile(c.region, c.realm, c.name, true),
                    this.characterService.getMedia(c.region, c.realm, c.name, true),
                    this.characterService.getEquipment(c.region, c.realm, c.name, true),
                ).subscribe(([ profile, media, equipment ]) => {
                    characterData.profile = profile;
                    characterData.media = media;
                    characterData.equipment = equipment;
                    characterData.loading = false;
                }, error => {
                    characterData.error = true;
                    characterData.loading = false;
                });
            });
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
            { region: 'eu', realm: 'antonidas', name: 'rhoren', checklistId: 'bfa-alliance', overrides: {} },
            { region: 'eu', realm: 'blackrock', name: 'andesina', checklistId: 'bfa-horde', overrides: {
                'reputation-zandalariempire': { type: 'reputation', max: 7 },
            } },
        ]);
        this.fetch();
    }
}
