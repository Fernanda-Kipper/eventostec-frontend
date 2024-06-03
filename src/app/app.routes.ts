import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterEventComponent } from './pages/register-event/register-event.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'registra-evento',
    component: RegisterEventComponent,
  },
];
