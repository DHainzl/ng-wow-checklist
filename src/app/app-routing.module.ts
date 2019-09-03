import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'character',
        loadChildren: () => import('./pages/characters/characters.module').then(m => m.CharactersModule),
    },
    {
        path: 'character/:region/:realm/:name',
        loadChildren: () => import('./pages/checklist/checklist.module').then(m => m.ChecklistModule),
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
