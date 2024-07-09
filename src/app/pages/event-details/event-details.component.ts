import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { switchMap } from 'rxjs';

import { EventsService } from './../../services/events.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { CouponsComponent } from '../../components/coupon/coupon.component';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CouponsComponent],
  templateUrl: './event-details.component.html',
})
export class EventDetailsComponent {
  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
  ) {}

  event$ = this.route.params.pipe(
    switchMap((params) => this.eventsService.getEventById(params['id'])),
  );

  onRegisterCoupon() {
    // Lógica para registrar um cupom
    console.log('Registrar cupom clicado');
    // Aqui você pode adicionar a navegação para uma página de cadastro de cupons
    // ou abrir um modal para o usuário preencher os dados do cupom
  }
}
