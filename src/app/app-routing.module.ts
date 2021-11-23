import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsLoggedInGuard } from './core/guards/is-logged-in-guard.service';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/characters/characters.module').then(m => m.CharactersModule),
        canActivate: [ IsLoggedInGuard ],
    },
    {
        path: ':region/:realm/:name/checklist',
        loadChildren: () => import('./pages/checklist/checklist.module').then(m => m.ChecklistModule),
        canActivate: [ IsLoggedInGuard ],
    },
    {
        path: 'import',
        loadChildren: () => import('./pages/import/import.module').then(m => m.ImportModule),
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
