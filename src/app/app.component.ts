import {
  Component,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgSelectModule } from '@ng-select/ng-select';

import { EventComponent } from './components/event/event.component';
import { ModalComponent } from './components/modal/modal.component';
import { HeaderComponent } from './header/header.component';
import { FilterService } from './services/filter.service';
import { UF } from './types/UF.type';
import { City } from './types/City.type';
import { EventItem } from './types/Event.type';

interface FilterForm {
  locale: FormControl<string | null>;
  city: FormControl<string | null>;
  from: FormControl<Date | null>;
  to: FormControl<Date | null>;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ModalComponent,
    EventComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('stateSelect') stateSelect!: ElementRef<HTMLSelectElement>;

  filterForm!: FormGroup<FilterForm>;
  isModalOpen = signal(false);

  states: { id: number; label: string; value: string }[] = [];
  cities: { id: number; label: string; value: string }[] = [];

  eventList: EventItem[] = [];

  filterIsActive = false;

  constructor(private filterService: FilterService) {}

  ngOnInit() {
    this.filterForm = new FormGroup<FilterForm>({
      locale: new FormControl<string | null>(null),
      city: new FormControl<string | null>(null),
      from: new FormControl<Date | null>(null),
      to: new FormControl<Date | null>(null),
    });

    this.loadLocalesFilter();

    this.eventList = [
      {
        title: 'Frontin Sampa',
        place: 'São Paulo',
        date: '19/10/2024',
        description: 'Maior evento de Frontend do Brasil!',
        banner: 'https://images.sympla.com.br/630305a3009a1-lg.png',
        url: 'https://frontinsampa.com.br/',
      },
    ];
  }

  loadLocalesFilter() {
    this.filterService.loadLocales().subscribe({
      next: (body: UF[]) => {
        this.states = body.map((value) => ({
          id: value.id,
          label: value.nome,
          value: value.sigla,
        }));
      },
    });
  }

  loadCities(selectedState: number) {
    this.filterService.loadCitiesByState(selectedState).subscribe({
      next: (cities: City[]) => {
        this.cities = cities.map((city) => ({
          id: city.id,
          label: city.nome,
          value: city.nome,
        }));
      },
      error: (error) => {
        console.error('Error loading cities:', error);
        // Handle the error (e.g., show an error message to the user)
      },
    });
  }

  stateSelect2() {
    const selectedStateValue = this.filterForm.get('locale')!.value;
    if (selectedStateValue) {
      this.loadCities(Number(selectedStateValue));
    }
  }

  toggleModal() {
    this.isModalOpen.update((value) => !value);
  }

  submit() {
    this.isModalOpen.set(false);
    this.filterIsActive = true;
  }

  isFilterActive() {
    return this.filterIsActive ? 'visible' : 'invisible';
  }

  clearFilter() {
    this.filterIsActive = false;
    this.filterForm.reset();
  }
}
