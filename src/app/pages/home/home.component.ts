import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  startWith,
} from 'rxjs';
import { EventComponent } from '../../components/event/event.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { EventsService } from '../../services/events.service';
import { FilterService } from '../../services/filter.service';
import { City } from '../../types/City.type';
import { EventItem } from '../../types/Event.type';
import { UF } from '../../types/UF.type';

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
    DropdownModule,
    FloatLabelModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ModalComponent,
    EventComponent,
    HeaderComponent,
    FooterComponent,
    RouterModule,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {
  isModalOpen = signal(false);
  filterIsActive = false;
  filterForm!: FormGroup<FilterForm>;
  states: { id: number; label: string; value: string }[] = [];
  cities: { id: number; label: string; value: string }[] = [];
  isOnline: boolean = false;
  events$!: Observable<EventItem[]>;
  filteredEventList$!: Observable<EventItem[]>;
  searchTerm = new BehaviorSubject<string>('');

  constructor(
    private filterService: FilterService,
    private eventsService: EventsService,
  ) {}

  ngOnInit() {
    this.filterForm = new FormGroup<FilterForm>({
      locale: new FormControl<string | null>(null, [Validators.required]),
      city: new FormControl<string | null>(null, [Validators.required]),
      from: new FormControl<Date | null>(null, [Validators.required]),
      to: new FormControl<Date | null>(null, [Validators.required]),
    });

    this.loadLocalesFilter();
    this.getEvents();
  }

  ngAfterViewInit() {
    this.getEvents();
  }

  getEvents() {
    this.events$ = this.eventsService.getEvents(0, 20);
    this.filteredEventList$ = combineLatest([
      this.searchTerm.pipe(startWith('')),
      this.events$,
    ]).pipe(map(([term, events]) => this.getFilteredEvents(term, events)));
  }

  loadLocalesFilter() {
    this.filterService.loadLocales().subscribe({
      next: (body: UF[]) => {
        this.states = body.map((value) => ({
          id: value.id,
          name: value.nome,
          code: value.sigla,
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

    if (this.filterForm.invalid) {
      return;
    }

    const startDate =
      this.filterForm.value?.from instanceof Date
        ? this.filterForm.value?.from.toISOString()
        : this.filterForm.value?.from;
    const endDate =
      this.filterForm.value?.to instanceof Date
        ? this.filterForm.value?.to.toISOString()
        : this.filterForm.value?.to;

    this.filteredEventList$ = this.eventsService.getFilteredEvents(
      this.filterForm.value.city ?? '',
      this.filterForm.value.locale ?? '',
      startDate ?? '',
      endDate ?? '',
    );
  }

  isFilterActive() {
    return this.filterIsActive ? 'visible' : 'invisible';
  }

  clearFilter() {
    this.filterIsActive = false;
    this.filterForm.reset();
    this.getEvents();
  }

  handleSelectLocale() {
    const selectedStateValue = this.filterForm.get('locale')!.value;
    const selectedState = this.states.filter(
      (state) => state.value === selectedStateValue,
    );
    if (selectedStateValue && selectedState.length) {
      this.loadCities(Number(selectedState[0].id));
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

  getFilteredEvents(term: string, events: EventItem[]): EventItem[] {
    return events.filter((event) =>
      event.title.toLowerCase().includes(term.toLowerCase()),
    );
  }

  updateSearchTerm(newTerm: string) {
    this.searchTerm.next(newTerm);
  }
}
