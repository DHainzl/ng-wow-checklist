import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";
import { CharacterStoreService } from "src/app/core/services/character-store/character-store.service";

@Component({
    templateUrl: './import.component.html',
    styleUrls: [ './import.component.scss' ],
})
export class ImportComponent implements OnInit, OnDestroy {
    exportData: string;
    importData: string = '';

    private subscriptions = new Subscription();

    constructor(
        private characterStoreService: CharacterStoreService,
        private snackBar: MatSnackBar,
    ) { }

    ngOnInit(): void {
        this.characterStoreService.getCharacters();

        this.subscriptions.add(this.characterStoreService.charactersChanged.subscribe(characters => {
            this.exportData = JSON.stringify(characters);
        }));
    }
    
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    import() {
        if (!this.importData) {
            this.snackBar.open('Please enter some data to import', 'OK');
            return;
        }

        try {
            const data = JSON.parse(this.importData);

            this.characterStoreService.setCharacters(data);

            this.exportData = this.importData;
            this.importData = '';

            this.snackBar.open('Data imported successfully!', 'OK');
        } catch (ex) {
            this.snackBar.open('Could not parse pasted data. Please verify it is correct!', 'OK');
        }

    }
}
