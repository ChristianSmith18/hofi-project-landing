import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy').then((m) => m.Privacy),
  },
  { path: 'terms', loadComponent: () => import('./pages/terms/terms').then((m) => m.Terms) },
  {
    path: 'delete-account',
    loadComponent: () =>
      import('./pages/account-deletion/account-deletion').then((m) => m.AccountDeletion),
  },
  { path: 'join/:token', loadComponent: () => import('./pages/join/join').then((m) => m.Join) },
  { path: '**', redirectTo: '' },
];
