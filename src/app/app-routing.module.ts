import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { ChecklistComponent } from './checklist/checklist.component';

const routes: Routes = [
    {
        path: 'character',
        component: CharactersComponent,
    },
    {
        path: 'character/:region/:realm/:name',
        component: ChecklistComponent,
    },
    {
        path: '',
        redirectTo: 'character',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [ RouterModule ],
})
export class AppRoutingModule { }
