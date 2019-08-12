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
        { region: 'eu', realm: 'antonidas', name: 'jamik' },
        // { region: 'eu', realm: 'antonidas', name: 'maerwen' },
        // { region: 'eu', realm: 'antonidas', name: 'bastrik' },
        { region: 'eu', realm: 'antonidas', name: 'cerulia' },
        // { region: 'eu', realm: 'antonidas', name: 'jaspia' },
        { region: 'eu', realm: 'blackrock', name: 'andesina' },
    ];

    fields = 'items,achievements,professions,quests,reputation';

    characterData = [];

    constructor(
        private characterService: CharacterService,
    ) { }

    fetch(): void {
        const fields = [ 'items', 'achievements', 'reputation', 'quests', 'professions' ];
        this.characters.forEach((c, idx) => {
            this.characterService.getCharacter(c.region, c.realm, c.name, fields)
                .subscribe(result => {
                    this.characterData[idx] = result;
                });
        });
    }

    hasAv(result, id: number): string {
        return result.achievements.achievementsCompleted.includes(id) ? 'done' : '-';
    }
    hasQuest(result, id: number): string {
        return result.quests.includes(id) ? 'done' : '-';
    }
    hasReputation(result, id: number, level: number): string {
        const rep = result.reputation.find(r => r.id === id);

        if (!rep) {
            return '-';
        }

        if (rep.standing === level) {
            return 'done';
        }

        return `${rep.value} / ${rep.max}`;
    }
    hasPrimaryProfession(result, id: number): string {
        return this.hasProfession(result.professions.primary, id);
    }
    hasSecondaryProfession(result, id: number): string {
        return this.hasProfession(result.professions.secondary, id);
    }

    private hasProfession(data, id: number): string {
        const profession = data.find(d => d.id === id);
        if (!profession) {
            return '-';
        }

        // const max = profession.name.indexOf('Kul Tiran') !== -1 ? 175 : profession.max;

        if (profession.rank === profession.max) {
            return 'done';
        }
        return `${profession.rank} / ${profession.max}`;
    }
}
