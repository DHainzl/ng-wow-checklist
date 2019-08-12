import { Component, OnInit } from '@angular/core';
import { Region } from '../services/battle-net/battle-net.interface';
import { BattleNetCharacterService } from '../services/battle-net/character/character.service';
import { CharacterStoreService } from '../services/character-store/character-store.service';
import { CharacterInfo } from '../services/character-store/character-store.interface';
import { BattleNetCharacter } from '../services/battle-net/character/character.interface';

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
}
