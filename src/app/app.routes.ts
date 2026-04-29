import type { Routes } from '@angular/router'

/**
 * Main application routes configuration.
 *
 * @remarks
 * This array defines the routes for the Angular application.
 */
export const routes: Routes = [
  {
    path: 'pokedex',
    loadComponent: () => import('./pages/main.page').then((m) => m.MainPage),
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./pages/sign-up.page').then((m) => m.SignUpPage),
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./pages/sign-in.page').then((m) => m.SignInPage),
  },
]
