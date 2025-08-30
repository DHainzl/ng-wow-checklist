import { Routes } from '@angular/router';
import { isLoggedIn } from './core/guards/is-logged-in-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/characters/characters.component').then(m => m.CharactersComponent),
        canActivate: [ isLoggedIn ],
    },
    {
        path: ':region/:realm/:name/checklist',
        loadComponent: () => import('./pages/checklist/checklist.component').then(m => m.ChecklistComponent),
        canActivate: [ isLoggedIn ],
    },
    {
        path: 'gear-grid',
        loadComponent: () => import('./pages/gear-grid/gear-grid.component').then(m => m.GearGridComponent),
        canActivate: [ isLoggedIn ],
    },
    {
        path: 'import',
        loadComponent: () => import('./pages/import/import.component').then(m => m.ImportComponent),
        canActivate: [ isLoggedIn ],
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];
