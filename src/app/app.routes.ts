import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'sign-up',
        loadComponent: () => import('./pages/sign-up/sign-up.component').then(m => m.SignUpComponent)
    }, {
        path: '', redirectTo: 'sign-up', pathMatch: 'full'
    }
];
