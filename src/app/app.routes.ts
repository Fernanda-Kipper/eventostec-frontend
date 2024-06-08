import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent() {
      return import('./pages/events/events.component').then(
        (m) => m.EventsComponent,
      );
    },
  },
  {
    path: 'event',
    children: [
      {
        path: 'create',
        loadComponent() {
          return import('./pages/create-event/create-event.component').then(
            (m) => m.CreateEventComponent,
          );
        },
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
