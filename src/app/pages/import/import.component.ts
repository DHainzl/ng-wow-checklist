import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { Title } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { CharacterStoreService } from "../../core/services/character-store/character-store.service";

@Component({
    templateUrl: './import.component.html',
    styleUrls: [ './import.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,

        FormsModule,
    ],
})
export class ImportComponent implements OnInit, OnDestroy {
    private readonly characterStoreService = inject(CharacterStoreService);
    private readonly snackBar = inject(MatSnackBar);
    private readonly titleService = inject(Title);

    readonly exportData = signal<string>('');
    readonly importData = signal<string>('');

    private subscriptions = new Subscription();

    ngOnInit(): void {
        this.titleService.setTitle('Import / Export');
        this.characterStoreService.getCharacters();

        this.subscriptions.add(this.characterStoreService.charactersChanged.subscribe(characters => {
            this.exportData.set(JSON.stringify(characters));
        }));
    }
    
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    import() {
        if (!this.importData()) {
            this.snackBar.open('Please enter some data to import', 'OK');
            return;
        }

        try {
            const data = JSON.parse(this.importData());

            this.characterStoreService.setCharacters(data);

            this.exportData.set(this.importData());
            this.importData.set('');

            this.snackBar.open('Data imported successfully!', 'OK');
        } catch (ex) {
            this.snackBar.open('Could not parse pasted data. Please verify it is correct!', 'OK');
        }

    }
}
