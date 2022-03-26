import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { AddCharacterComponent } from './add-character/add-character.component';
import { CharactersComponent } from './characters.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: CharactersComponent }]),
        CommonModule,
        SharedModule,
    ],
    declarations: [
        CharactersComponent,
        AddCharacterComponent,
    ]
})
export class CharactersModule {}
