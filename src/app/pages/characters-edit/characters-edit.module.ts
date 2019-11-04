import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { CharactersEditComponent } from './characters-edit.component';

@NgModule({
    imports: [
        RouterModule.forChild([ { path: '', component: CharactersEditComponent } ]),

        CommonModule,
        SharedModule,
        DragDropModule,
    ],
    declarations: [
        CharactersEditComponent,
    ],
})
export class CharactersEditModule {}
