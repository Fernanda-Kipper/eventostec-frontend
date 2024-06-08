import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'eventos', pathMatch: 'full' },
  {
    path: 'eventos',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'criar-evento',
    loadComponent: () =>
      import('./pages/create-event/create-event.component').then(
        (c) => c.CreateEventComponent,
      ),
  },
  { path: '**', redirectTo: 'eventos' },
];
