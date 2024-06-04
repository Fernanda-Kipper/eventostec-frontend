import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { City } from '../../types/City.type';
import { UF } from '../../types/UF.type';

interface CreateEventFormControl {
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  date: FormControl<string | null>;
  city: FormControl<string | null>;
  state: FormControl<string | null>;
  banner: FormControl<File | null>;
  bannerFile: FormControl<File | null>;
  url: FormControl<string | null>;
}

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss',
})
export class CreateEventComponent implements OnInit {
  filterService = inject(FilterService);
  moreInformationExpanded = false;
  states: { id: number; label: string; value: string }[] = [];
  cities: { id: number; label: string; value: string }[] = [];

  createEventForm = new FormGroup<CreateEventFormControl>({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
    url: new FormControl(null, [Validators.required]),
    banner: new FormControl(null),
    bannerFile: new FormControl(null),
  });

  ngOnInit() {
    this.getLocales();
  }

  createEvent() {
    console.log(this.createEventForm.value);
    if (this.createEventForm.invalid || !this.createEventForm.get('bannerFile'))
      return;
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
      console.log(input.files);
      this.createEventForm.get('bannerFile')?.setValue(input.files[0]);
    }
  }
}
