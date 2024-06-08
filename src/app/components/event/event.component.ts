import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event.component.html',
})
export class EventComponent {
  @Input() title: string = '';
  @Input() type: string = '';
  @Input() description: string = '';
  @Input() date: string = '';
  @Input() city: string = '';
  @Input() state: string = '';
  @Input() bannerUrl: string = '';
  @Input() url: string = '';
}
