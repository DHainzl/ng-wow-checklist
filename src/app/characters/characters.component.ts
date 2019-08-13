import { Component, OnInit } from '@angular/core';
import { Region } from '../services/battle-net/battle-net.interface';
import { BattleNetCharacterService } from '../services/battle-net/character/character.service';
import { CharacterStoreService } from '../services/character-store/character-store.service';
import { CharacterInfo } from '../services/character-store/character-store.interface';
import { BattleNetCharacter } from '../services/battle-net/character/character.interface';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-characters',
    templateUrl: './characters.component.html',
    styleUrls: [ './characters.component.scss' ],
})
export class CharactersComponent implements OnInit {
    loading: boolean = true;

    characterData: { info: CharacterInfo, data: BattleNetCharacter }[] = [];
    resolved: number = 0;

    constructor(
        private characterService: BattleNetCharacterService,
        private characterStoreService: CharacterStoreService,
        private localStorageService: LocalStorageService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.fetch();
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
                this.characterService.getCharacter(c.region, c.realm, c.name, [ 'items' ])
                  .subscribe(result => {
                        this.characterData[idx] = {
                            info: c,
                            data: result,
                        };

                        this.resolved++;

                        if (characters.length === this.resolved) {
                            this.loading = false;
                        }
                  });
            });
        })   
    }

    setupTestData() {
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
            { region: 'eu', realm: 'blackrock', name: 'andesina', checklistId: '', overrides: {} }
        ]);
        this.fetch();
    }
}
