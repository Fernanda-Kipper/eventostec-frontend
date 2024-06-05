import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterEventComponent } from './pages/register-event/register-event.component';

export const routes: Routes = [
  {
    path: 'events',
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
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'registra-evento',
    component: RegisterEventComponent,
  },
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: '**', redirectTo: 'events', pathMatch: 'full' },
];
