import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { CharacterInfo } from '../../../core/services/character-store/character-store.interface';
import { CharacterStoreService } from '../../../core/services/character-store/character-store.service';

@Component({
    template: `{{ characterInfo.name | titlecase }} removed successfully!`,
    imports: [ TitleCasePipe ],
})
class RemoveCharacterConfirmationComponent {
    readonly characterInfo = inject<CharacterInfo>(MAT_SNACK_BAR_DATA);
}

@Component({
    templateUrl: './remove-character-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButtonModule,

        TitleCasePipe,
    ],
})
export class RemoveCharacterDialogComponent {
    private readonly characterStoreService = inject(CharacterStoreService);
    private readonly router = inject(Router);
    private readonly snackBar = inject(MatSnackBar);
    private readonly dialogRef = inject(MatDialogRef<RemoveCharacterDialogComponent>);
    readonly characterInfo = inject<CharacterInfo>(MAT_DIALOG_DATA);

    close(): void {
        this.dialogRef.close();
    }

    removeCharacter(): void {
        this.characterStoreService.getCharacters().pipe(
            mergeMap(characterInfos => {
                const newList = characterInfos
                    .filter(c => !(c.region === this.characterInfo.region &&
                            c.realm === this.characterInfo.realm &&
                            c.name === this.characterInfo.name));
                
                return this.characterStoreService.setCharacters(newList);
            })
        ).subscribe({
            next: () => {
                this.snackBar.openFromComponent(RemoveCharacterConfirmationComponent, {
                    data: this.characterInfo,
                    duration: 2000,
                });
                this.router.navigate([ '/home' ]);
                this.close();
            }
        });
    }
}
