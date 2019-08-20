import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { BattleNetCharacterService } from '../services/battle-net/character/character.service';
import { BattleNetEquipment } from '../services/battle-net/character/types/battlenet-equipment';
import { BattleNetMedia } from '../services/battle-net/character/types/battlenet-media';
import { BattleNetProfile } from '../services/battle-net/character/types/battlenet-profile';
import { CharacterInfo } from '../services/character-store/character-store.interface';
import { CharacterStoreService } from '../services/character-store/character-store.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
    selector: 'app-characters',
    templateUrl: './characters.component.html',
    styleUrls: [ './characters.component.scss' ],
})
export class CharactersComponent implements OnInit {
    loading: boolean = true;

    characterData: {
        info: CharacterInfo,
        profile: BattleNetProfile,
        media: BattleNetMedia,
        equipment: BattleNetEquipment,
    }[] = [];
    resolved: number = 0;

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
        this.resolved = 0;

        this.characterStoreService.getCharacters().subscribe(characters => {
            if (!characters.length) {
                this.loading = false;
                return;
            }

            characters.forEach((c, idx) => {
                forkJoin(
                    this.characterService.getProfile(c.region, c.realm, c.name, true),
                    this.characterService.getMedia(c.region, c.realm, c.name, true),
                    this.characterService.getEquipment(c.region, c.realm, c.name, true),
                ).subscribe(([ profile, media, equipment ]) => {
                    this.characterData[idx] = {
                        info: c,
                        profile,
                        media,
                        equipment,
                    };

                    this.resolved++;

                    if (characters.length === this.resolved) {
                        this.loading = false;
                    }
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
            { region: 'eu', realm: 'blackrock', name: 'andesina', checklistId: 'bfa-horde', overrides: {
                'reputation-zandalariempire': { type: 'reputation', max: 7 },
            } },
        ]);
        this.fetch();
    }
}
