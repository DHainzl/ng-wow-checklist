import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterLink } from "@angular/router";
import { catchError, forkJoin, of } from "rxjs";
import { environment } from "../../../../environments/environment";
import { BattleNetCharacterService } from "../../../core/services/battle-net/character/character.service";
import { BattleNetEquipment } from "../../../core/services/battle-net/character/types/battlenet-equipment";
import { BattleNetMedia } from "../../../core/services/battle-net/character/types/battlenet-media";
import { BattleNetProfile } from "../../../core/services/battle-net/character/types/battlenet-profile";
import { CharacterInfo } from "../../../core/services/character-store/character-store.interface";
import { BarPercentagePipe } from "../../../shared/pipes/bar-percentage.pipe";
import { MediaAssetPipe } from "../../../shared/pipes/media-asset.pipe";
import { SafeBackgroundImagePipe } from "../../../shared/pipes/safe-background-image.pipe";

@Component({
    selector: 'character-line',
    templateUrl: './character-line.component.html',
    styleUrl: './character-line.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,

        RouterLink,
        MediaAssetPipe,
        SafeBackgroundImagePipe,
        BarPercentagePipe,
    ]
})
export class CharacterLineComponent {
    readonly MAX_LEVEL = environment.maxLevel;
    readonly MAX_SECONDARY = 80;
    
    private readonly characterService = inject(BattleNetCharacterService);

    readonly characterInfo = input.required<CharacterInfo>();

    readonly loading = signal<boolean>(true);
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
                this.loading.set(false);
                this.error.set(true);
            }
        });
    }
}