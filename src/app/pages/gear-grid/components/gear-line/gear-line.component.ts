import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { catchError, forkJoin, of } from "rxjs";
import { BattleNetCharacterService } from "../../../../core/services/battle-net/character/character.service";
import { BattleNetEquipment } from "../../../../core/services/battle-net/character/types/battlenet-equipment";
import { BattleNetMedia } from "../../../../core/services/battle-net/character/types/battlenet-media";
import { BattleNetProfile } from "../../../../core/services/battle-net/character/types/battlenet-profile";
import { CharacterInfo } from "../../../../core/services/character-store/character-store.interface";
import { MediaAssetPipe } from "../../../../shared/pipes/media-asset.pipe";
import { SafeBackgroundImagePipe } from "../../../../shared/pipes/safe-background-image.pipe";
import { GearIlvlComponent } from "../gear-ilvl/gear-ilvl.component";

@Component({
    selector: 'gear-line',
    templateUrl: './gear-line.component.html',
    styleUrls: [ './gear-line.component.scss', '../../gear-grid.shared.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCardModule,

        MediaAssetPipe,
        SafeBackgroundImagePipe,
        
        GearIlvlComponent,
    ],
})
export class GearLineComponent {
    private readonly characterService = inject(BattleNetCharacterService);

    readonly characterInfo = input.required<CharacterInfo>();

    readonly loading = signal<boolean>(false);
    readonly error = signal<boolean>(false);

    readonly profile = signal<BattleNetProfile | undefined>(undefined);
    readonly media = signal<BattleNetMedia | undefined>(undefined);
    readonly equipment = signal<BattleNetEquipment | undefined>(undefined);

    constructor() {
        effect(() => this.loadData());
    }

    private loadData(): void {
        this.loading.set(true);
        this.error.set(false);

        const { region, realm, name } = this.characterInfo();

        forkJoin([
            this.characterService.getProfile(region, realm, name, true),
            this.characterService.getMedia(region, realm, name, true).pipe(
                catchError(() => of(undefined)),
            ),
            this.characterService.getEquipment(region, realm, name, true),
        ]).subscribe({
            next: ([ profile, media, equipment ]) => {
                this.profile.set(profile);
                this.media.set(media || this.characterService.getMediaMock(region, profile));
                this.equipment.set(equipment);

                this.loading.set(false);
            },
            error: error => {
                this.error.set(true);
                this.loading.set(false);
            }
        });
    }
}
