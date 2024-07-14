import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'eventos',
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/event-details/event-details.component').then(
            (c) => c.EventDetailsComponent,
          ),
      },
    ],
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
