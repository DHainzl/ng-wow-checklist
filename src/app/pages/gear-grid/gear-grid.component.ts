import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Title } from "@angular/platform-browser";
import { CharacterInfo } from "../../core/services/character-store/character-store.interface";
import { CharacterStoreService } from "../../core/services/character-store/character-store.service";
import { IconPipe } from "../../shared/pipes/icon.pipe";
import { GearLineComponent } from "./components/gear-line/gear-line.component";

@Component({
    templateUrl: './gear-grid.component.html',
    styleUrls: [ '../page-style.scss', './gear-grid.component.scss', 'gear-grid.shared.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatProgressSpinnerModule,
        MatCardModule,

        IconPipe,

        GearLineComponent,
    ]
})
export class GearGridComponent implements OnInit {
    private readonly characterStoreService = inject(CharacterStoreService);

    private readonly titleService = inject(Title);

    readonly loading = signal<boolean>(true);
    readonly characterInfo = signal<CharacterInfo[]>([]);

    ngOnInit(): void {
        this.fetch();

        this.titleService.setTitle('Gear Grid');
    }

    private fetch() {
        this.loading.set(true);
        this.characterInfo.set([]);

        this.characterStoreService.getCharacters().subscribe({
            next: characters => {
                this.loading.set(false);
                this.characterInfo.set(characters);
            },
            error: error => {
                // TODO Error handling
            },
        });
    }
}
