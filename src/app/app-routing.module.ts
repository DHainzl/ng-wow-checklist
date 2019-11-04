import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./pages/characters/characters.module').then(m => m.CharactersModule),
    },
    {
        path: ':region/:realm/:name/checklist',
        loadChildren: () => import('./pages/checklist/checklist.module').then(m => m.ChecklistModule),
    },
    {
        path: '',
        redirectTo: 'home',
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
