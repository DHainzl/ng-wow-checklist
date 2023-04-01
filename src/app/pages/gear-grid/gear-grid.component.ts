import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { forkJoin } from "rxjs";
import { BattleNetCharacterService } from "src/app/core/services/battle-net/character/character.service";
import { BattleNetEquipment } from "src/app/core/services/battle-net/character/types/battlenet-equipment";
import { BattleNetMedia } from "src/app/core/services/battle-net/character/types/battlenet-media";
import { BattleNetProfile } from "src/app/core/services/battle-net/character/types/battlenet-profile";
import { CharacterInfo } from "src/app/core/services/character-store/character-store.interface";
import { CharacterStoreService } from "src/app/core/services/character-store/character-store.service";

export interface CharacterDataForGrid {
    info: CharacterInfo;
    loading: boolean;
    error?: boolean;
    profile?: BattleNetProfile;
    media?: BattleNetMedia;
    equipment?: BattleNetEquipment;
}

@Component({
    templateUrl: './gear-grid.component.html',
    styleUrls: [ './gear-grid.component.scss' ],
})
export class GearGridComponent implements OnInit {
    loading: boolean = true;

    characterData: CharacterDataForGrid[] = [];

    constructor(
        private characterService: BattleNetCharacterService,
        private characterStoreService: CharacterStoreService,

        private titleService: Title,
    ) { }

    ngOnInit(): void {
        this.fetch();
        this.titleService.setTitle('Gear Grid');
    }

    private fetch() {
        this.loading = true;
        this.characterData = [];

        this.characterStoreService.getCharacters().subscribe(characters => {
            this.loading = false;

            if (!characters.length) {
                return;
            }

            characters.forEach(char => {
                const charData: CharacterDataForGrid = {
                    info: char,
                    loading: true,
                };

                this.characterData.push(charData);

                forkJoin([
                    this.characterService.getProfile(char.region, char.realm, char.name, true),
                    this.characterService.getMedia(char.region, char.realm, char.name, true),
                    this.characterService.getEquipment(char.region, char.realm, char.name, true),
                ]).subscribe({
                    next: ([ profile, media, equipment ]) => {
                        charData.profile = profile;
                        charData.media = media;
                        charData.equipment = equipment;
                        charData.loading = false;
                    },
                    error: error => {
                        charData.error = true;
                        charData.loading = false;
                    }
                });
            })
        })
    }
}