import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { UF } from '../../types/UF.type';
import { City } from '../../types/City.type';

interface EventForm {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  url: FormControl<string | null>;
  locale: FormControl<string | null>;
  city: FormControl<string | null>;
  date: FormControl<Date | null>;
}

@Component({
  selector: 'app-register-event',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-event.component.html',
  styleUrl: './register-event.component.scss',
})
export class RegisterEventComponent implements OnInit {
  eventForm!: FormGroup;
  states: { id: number; label: string; value: string }[] = [];
  cities: { id: number; label: string; value: string }[] = [];

  // eslint-disable-next-line no-useless-escape
  urlRegexValidator =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

  constructor(private filterService: FilterService) {}

  ngOnInit() {
    this.eventForm = new FormGroup<EventForm>({
      name: new FormControl<string | null>(null, [Validators.required]),
      description: new FormControl<string | null>(null, [Validators.required]),
      url: new FormControl<string | null>(null, [
        Validators.required,
        Validators.pattern(this.urlRegexValidator),
      ]),
      locale: new FormControl<string | null>(null, [Validators.required]),
      city: new FormControl<string | null>(null, [Validators.required]),
      date: new FormControl<Date | null>(null, [Validators.required]),
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
    const selectedStateValue = this.eventForm.get('locale')!.value;
    if (selectedStateValue) {
      this.loadCities(Number(selectedStateValue));
    }
  }

  submit() {}
}
