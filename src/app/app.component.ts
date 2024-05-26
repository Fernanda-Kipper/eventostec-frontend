import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventComponent } from './components/event/event.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EventComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  events = [
    { title: "Frontin Sampa", place: "São Paulo", date: "19/10/2024", description: "Maior evento de Frontend do Brasil!"}
  ]
}
