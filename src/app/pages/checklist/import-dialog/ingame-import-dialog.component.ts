import { ChangeDetectionStrategy, Component, Inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CharacterIngameData } from "../../../core/services/character-store/character-store.interface";
import { CharacterStoreService } from "../../../core/services/character-store/character-store.service";
@Component({
    templateUrl: './ingame-import-dialog.component.html',
    styleUrls: [ './ingame-import-dialog.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,

        FormsModule,
    ],
})
export class IngameImportDialogComponent {
    error = signal<string>('');
    importData = signal<string>('');

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: {
            region: string;
            realm: string;
            name: string;
        },
        private dialogRef: MatDialogRef<IngameImportDialogComponent>,

        private characterStoreService: CharacterStoreService,
    ) { }

    import(): void {
        if (!this.importData()) {
            this.error.set('Please paste some text');
            return;
        }

        try {
            const parsed: CharacterIngameData = JSON.parse(this.importData());

            if (parsed && 
                parsed.character.region.toLocaleLowerCase() === this.data.region.toLocaleLowerCase() &&
                parsed.character.realm.toLocaleLowerCase() === this.data.realm.toLocaleLowerCase() &&
                parsed.character.name.toLocaleLowerCase() === this.data.name.toLocaleLowerCase()
            ) {
                this.characterStoreService.setIngameData(parsed);
                this.dialogRef.close(true);
            } else {
                this.error.set(`Imported character ${parsed.character.name} seems to be different than this one.`);
                return;
            }

        } catch (ex) {
            this.error.set('Could not parse pasted data.');
            return;
        }
    }
}
