import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent {
  @Input() title: string = 'Não conseguimos carregar';
  @Input() description: string = 'descrição virá em breve! hehe';
  @Input() date: string = '19/10/2024';
  @Input() place: string = 'Online';
  @Input() banner: string = 'https://images.sympla.com.br/630305a3009a1-lg.png';
  @Input() url: string = 'https://hacktown.com.br/';
}
