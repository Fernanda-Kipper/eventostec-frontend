import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FooterComponent } from '../../components/footer/footer.component';
import { EventsService } from '../../services/events.service';
import { FilterService } from '../../services/filter.service';
import { City } from '../../types/City.type';
import { EventType } from '../../types/Event.type';
import { UF } from '../../types/UF.type';
import { URLRegexValidator } from '../../utils/url-regex-validator.util';

export interface CreateEventFormControl {
  title: FormControl<string | null>;
  type: FormControl<EventType | null>;
  description: FormControl<string | null>;
  date: FormControl<string | null>;
  city: FormControl<string | null>;
  state: FormControl<string | null>;
  bannerFile: FormControl<File | null>;
  url: FormControl<string | null>;
}

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent, DropdownModule],
  templateUrl: './create-event.component.html',
})
export class CreateEventComponent implements OnInit {
  filterService = inject(FilterService);
  eventsService = inject(EventsService);
  router = inject(Router);
  createEventForm!: FormGroup;
  moreInformationExpanded = false;
  states: { id: number; label: string; value: string }[] = [];
  cities: { id: number; label: string; value: string }[] = [];
  EventType = EventType;
  events$ = this.eventsService.getEvents();
  todayDate!: string;
  validDate: boolean = true;
  maxDate: string = '2030-01-01';

  isLoading = signal(false);

  ngOnInit() {
    this.createEventForm = new FormGroup<CreateEventFormControl>({
      title: new FormControl(null, [Validators.required]),
      type: new FormControl(EventType.PRESENTIAL, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      url: new FormControl(null, [Validators.pattern(URLRegexValidator)]),
      bannerFile: new FormControl(null),
    });
    this.getLocales();
  }

  updateTodayDate() {
    this.todayDate = new Date().toISOString().split('T')[0];
  }

  dateValidator() {
    this.updateTodayDate();
    const selectedDate = this.createEventForm.get('date')?.value;
    if (selectedDate) {
      const selected = new Date(selectedDate);
      const today = new Date(this.todayDate);
      const max = new Date(this.maxDate);

      if (selected >= today && selected <= max) {
        this.validDate = true;
      } else {
        this.validDate = false;
      }
    } else {
      this.validDate = false;
    }
  }

  setLocaleAsString() {
    this.getInfoState();
    const selectedStateValue = this.createEventForm.get('state')?.value;
    const selectedState = this.states.find(
      (option) => option.id === Number(selectedStateValue),
    );
    if (selectedState) {
      this.createEventForm.patchValue({ state: selectedState.value });
    } else {
      console.error('Estado não encontrado!');
    }
    const selectedCityValue = this.createEventForm.get('city')?.value;
    const selectedCity = this.cities.find(
      (option) => option.id === Number(selectedCityValue),
    );
    if (selectedCity) {
      this.createEventForm.patchValue({ city: selectedCity.label });
    } else {
      console.error('Cidade não encontrada!');
    }
  }

  createEvent() {
    this.dateValidator();
    this.isLoading.set(true);

    if (!this.createEventForm?.valid) {
      return;
    }

    if (
      this.createEventForm.get('type')?.value === 'Presencial' &&
      this.validDate
    ) {
      this.setLocaleAsString();
    }

    if (this.validDate) {
      const data = new FormData();
      data.append('title', this.createEventForm.value.title);
      data.append('description', this.createEventForm.value.description);
      data.append('image', this.createEventForm.value.bannerFile);
      data.append('state', this.createEventForm.value.state ?? '');
      data.append('city', this.createEventForm.value.city ?? '');
      data.append('eventUrl', this.createEventForm.value.url);
      data.append(
        'remote',
        this.createEventForm.value.type == EventType.ONLINE ? 'true' : 'false',
      );
      data.append(
        'date',
        new Date(this.createEventForm.value?.date?.toString())
          .getTime()
          .toString(),
      );

      this.eventsService.createEvent(data).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.isLoading.set(false);
          console.error('Erro ao cadastrar evento:', error);
        },
      });
    } else {
      console.log('Data inválida, evento não criado');
    }
  }

  getLocales() {
    this.filterService.loadLocales().subscribe({
      next: (body: UF[]) => {
        this.states = body.map((value) => ({
          id: value.id,
          label: value.nome,
          value: value.sigla,
        }));
        const firstState = this.states[0].id;
        this.createEventForm.get('state')?.setValue(String(firstState));
        this.getInfoState();
      },
    });
  }

  getInfoState() {
    const currentState = this.createEventForm.get('state')?.value;
    if (currentState) this.getCities(Number(currentState));
  }

  getCities(selectedState: number) {
    this.filterService.loadCitiesByState(selectedState).subscribe({
      next: (cities: City[]) => {
        this.cities = cities.map((city) => ({
          id: city.id,
          label: city.nome,
          value: city.nome,
        }));
        const firstCity = this.cities[0].id;
        this.createEventForm.get('city')?.setValue(String(firstCity));
      },
      error: (error) => {
        console.error('Error loading cities:', error);
      },
    });
  }

  fileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.createEventForm.get('bannerFile')?.setValue(input.files[0]);
    }
  }

  handleEventType(type: EventType) {
    if (type === EventType.ONLINE) {
      this.createEventForm.patchValue({ type: EventType.ONLINE });
      this.updateValidators(false);
    } else {
      this.createEventForm.patchValue({ type: EventType.PRESENTIAL });
      this.updateValidators(true);
    }
  }

  updateValidators(shouldSetValidators: boolean) {
    const stateControl = this.createEventForm.get('state');
    const cityControl = this.createEventForm.get('city');

    if (shouldSetValidators) {
      stateControl?.setValidators([Validators.required]);
      cityControl?.setValidators([Validators.required]);
    } else {
      stateControl?.setValue(null);
      cityControl?.setValue(null);
      stateControl?.clearValidators();
      cityControl?.clearValidators();
    }
    stateControl?.updateValueAndValidity();
    cityControl?.updateValueAndValidity();
  }
}
