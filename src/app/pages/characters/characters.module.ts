import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { CharactersComponent } from './characters.component';

@NgModule({
    imports: [
        RouterModule.forChild([ { path: '', component: CharactersComponent } ]),

        CommonModule,
        SharedModule,
    ],
    declarations: [
        CharactersComponent,
    ],
})
export class CharactersModule {}
