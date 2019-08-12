import { Component } from '@angular/core';
import { CharacterService } from './services/battle-net/character/character.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    characters = [
        { region: 'eu', realm: 'antonidas', name: 'hoazl' },
        // { region: 'eu', realm: 'antonidas', name: 'thórn' },
        // { region: 'eu', realm: 'antonidas', name: 'harenya' },
        // { region: 'eu', realm: 'antonidas', name: 'jamik' },
        // { region: 'eu', realm: 'antonidas', name: 'maerwen' },
        // { region: 'eu', realm: 'antonidas', name: 'bastrik' },
        // { region: 'eu', realm: 'antonidas', name: 'cerulia' },
        // { region: 'eu', realm: 'antonidas', name: 'jaspia' },
        // { region: 'eu', realm: 'blackrock', name: 'andesina' },
    ];

    fields = 'items,achievements,professions,quests,reputation';

    characterData = [];

    constructor(
        private characterService: CharacterService,
    ) { }

    fetch(fields: string): void {
        this.characters.forEach((c, idx) => {
            this.characterService.getCharacter(c.region, c.realm, c.name, [ 'items', fields ])
                .subscribe(result => {
                    this.characterData[idx] = result;
                });
        });
    }
}
