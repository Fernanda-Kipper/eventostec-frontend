import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EventComponent } from '../../components/event/event.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { FilterService } from '../../services/filter.service';
import { City } from '../../types/City.type';
import { UF } from '../../types/UF.type';
import { EventsService } from '../../services/events.service';

interface FilterForm {
  locale: FormControl<string | null>;
  city: FormControl<string | null>;
  from: FormControl<Date | null>;
  to: FormControl<Date | null>;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ModalComponent,
    EventComponent,
    HeaderComponent,
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  filterService = inject(FilterService);
  eventsService = inject(EventsService);
  isModalOpen = signal(false);
  filterIsActive = false;
  filterForm!: FormGroup<FilterForm>;
  states: { id: number; label: string; value: string }[] = [];
  cities: { id: number; label: string; value: string }[] = [];
  events$ = this.eventsService.getEvents();
  isOnline: boolean = false;

  ngOnInit() {
    this.filterForm = new FormGroup<FilterForm>({
      locale: new FormControl<string | null>(null, [Validators.required]),
      city: new FormControl<string | null>(null, [Validators.required]),
      from: new FormControl<Date | null>(null, [Validators.required]),
      to: new FormControl<Date | null>(null, [Validators.required]),
    });
    this.loadLocalesFilter();
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

  stateSelect2() {
    const selectedStateValue = this.filterForm.get('locale')!.value;
    if (selectedStateValue) {
      this.loadCities(Number(selectedStateValue));
    }
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
      },
    });
  }
}
