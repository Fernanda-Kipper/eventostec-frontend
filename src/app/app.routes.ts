import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'eventos', pathMatch: 'full' },
  {
    path: 'eventos',
    loadComponent: () =>
      import('./pages/home/events.component').then((c) => c.EventsComponent),
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
