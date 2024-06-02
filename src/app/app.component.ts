import {Component, OnInit, signal} from '@angular/core';
import {EventType, RouterOutlet} from '@angular/router';
import { EventComponent } from './components/event/event.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterService } from './services/filter.service';
import { UF } from './types/UF.type';
import { ModalComponent } from './components/modal/modal.component';
import {eventType} from "./types/Event.type";
import { HeaderComponent } from './header/header.component';

interface FilterForm {
  locale: FormControl;
  from: FormControl;
  to: FormControl;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    EventComponent,
    CommonModule,
    ReactiveFormsModule,
    ModalComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  filterForm!: FormGroup<FilterForm>;
  isModalOpen = signal(false);

  states: { label: string; value: string }[] = [];

  eventList: eventType[] = [];

  filterIsActive = false;

  ngOnInit(){
    this.eventList = [
      { title: "Frontin Sampa", place: "São Paulo", date: "19/10/2024", description: "Maior evento de Frontend do Brasil!"},
      { title: "Frontin Sampa", place: "São Paulo", date: "19/10/2024", description: "Maior evento de Frontend do Brasil!"},
      { title: "Frontin Sampa", place: "São Paulo", date: "19/10/2024", description: "Maior evento de Frontend do Brasil!"},
      { title: "Frontin Sampa", place: "São Paulo", date: "19/10/2024", description: "Maior evento de Frontend do Brasil!"}
    ]
  }

  constructor(private filterService: FilterService) {
    this.filterForm = new FormGroup({
      locale: new FormControl(''),
      from: new FormControl(null),
      to: new FormControl(null),
    });

    this.loadLocalesFilter();
  }

  toggleModal() {
    this.isModalOpen.set(!this.isModalOpen());
  }

  loadLocalesFilter() {
    this.filterService.loadLocales().subscribe({
      next: (body: UF[]) => {
        this.states = body.map((value) => ({
          label: value.nome,
          value: value.sigla,
        }));
      },
    });
  }

  submit() {
    this.isModalOpen.set(false);
    this.filterIsActive = true;
  }

  isFilterActive() {
    if (this.filterIsActive){
      return "visible"
    }
    return "invisible"
  }

  clearFilter() {
    this.filterIsActive = false
    this.filterForm.reset();
  }
}
