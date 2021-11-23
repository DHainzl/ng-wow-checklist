import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CharactersService } from "src/app/core/services/battle-net/characters/characters.service";
import { CharacterIngameData } from "src/app/core/services/character-store/character-store.interface";
import { CharacterStoreService } from "src/app/core/services/character-store/character-store.service";

@Component({
    templateUrl: './ingame-import-dialog.component.html',
    styleUrls: [ './ingame-import-dialog.component.scss' ],
})
export class IngameImportDialogComponent {
    error: string = '';
    importData: string = '';

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
        if (!this.importData) {
            this.error = 'Please paste some text';
            return;
        }

        try {
            const parsed: CharacterIngameData = JSON.parse(this.importData);

            if (parsed && 
                parsed.character.region.toLocaleLowerCase() === this.data.region.toLocaleLowerCase() &&
                parsed.character.realm.toLocaleLowerCase() === this.data.realm.toLocaleLowerCase() &&
                parsed.character.name.toLocaleLowerCase() === this.data.name.toLocaleLowerCase()
            ) {
                this.characterStoreService.setIngameData(parsed);
                this.dialogRef.close(true);
            } else {
                this.error = `Imported character ${parsed.character.name} seems to be different than this one.`;
                return;
            }

        } catch (ex) {
            this.error = 'Could not parse pasted data.';
            return;
        }
    }
}
