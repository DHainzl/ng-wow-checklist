import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CharacterInfo } from 'src/app/core/services/character-store/character-store.interface';
import { CharacterStoreService } from 'src/app/core/services/character-store/character-store.service';

@Component({
    templateUrl: './characters-edit.component.html',
    styleUrls: [ './characters-edit.component.scss' ],
})
export class CharactersEditComponent implements OnInit {
    loading: boolean = true;
    characters: CharacterInfo[] = [];
    sortMode: boolean = false;

    constructor(
        private characterStoreService: CharacterStoreService,
    ) { }

    ngOnInit(): void {
        this.loadData().subscribe();
    }

    drop(event: CdkDragDrop<CharacterInfo[]>): void {
        moveItemInArray(this.characters, event.previousIndex, event.currentIndex);
    }

    enableSortMode(): void {
        this.sortMode = true;
    }

    cancelSortMode(): void {
        this.loadData().subscribe(() => {
            this.sortMode = false;
        });
    }

    saveSortMode(): void {
        this.saveData().subscribe(() => {
            this.sortMode = false;
        });
    }

    removeEntry(toRemove: CharacterInfo): void {
        // TODO User confirmation
        const idx = this.characters.findIndex(c => c.name === toRemove.name && c.realm === toRemove.realm && c.region === toRemove.region);
        if (idx === -1) {
            return;
        }

        this.characters.splice(idx, 1);
        this.saveData().subscribe();
    }

    private loadData(): Observable<CharacterInfo[]> {
        this.loading = true;
        return this.characterStoreService.getCharacters().pipe(
            tap(characters => {
                this.characters = characters;
                this.loading = false;
            }),
        );
    }

    private saveData(): Observable<undefined> {
        return this.characterStoreService.setCharacters(this.characters);
    }
}
