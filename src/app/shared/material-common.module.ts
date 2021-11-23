import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSelectModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
    ],
    exports: [
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSelectModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
    ],
})
export class MaterialCommonModule { }
