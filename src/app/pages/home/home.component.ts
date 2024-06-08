import {
  Component,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgSelectModule } from '@ng-select/ng-select';

import { EventComponent } from '../../components/event/event.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FilterService } from '../../services/filter.service';
import { UF } from '../../types/UF.type';
import { City } from '../../types/City.type';
import { EventItem } from '../../types/Event.type';

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
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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
      locale: new FormControl<string | null>(null, [Validators.required]),
      city: new FormControl<string | null>(null, [Validators.required]),
      from: new FormControl<Date | null>(null, [Validators.required]),
      to: new FormControl<Date | null>(null, [Validators.required]),
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
      {
        title: 'HackTown',
        place: 'Santa Rita do Sapucaí - MG',
        date: '1 a 4 de agosto',
        description: 'Com mais de 800 atividades simultâneas, o HackTown abrange tecnologia, empreendedorismo, música e artes, atraindo mais de 300 startups. O evento acontece em Santa Rita do Sapucaí, cidade que abriga mais de 160 empresas de tecnologia, ganhando o apelido de “Vale da Eletrônica”.',
        banner: 'https://assets-global.website-files.com/636d4036709c50b9ac704e98/65aeaa6f9fc603617a07e28b_hacktown-2024.jpg',
        url:"https://hacktown.com.br/"
      },
      {
        title: 'Rio Innovation Week',
        place: 'Rio de Janeiro - RJ',
        date: '13 a 16 de agosto',
        description: 'Um grande encontro que discute inovação, tecnologia e empreendedorismo que reúne mentes brilhantes do Brasil e do mundo já teve mais de 155 mil visitantes. E para 2024 as expectativas de público do Rio Innovation Week são ainda maiores.',
        banner: 'https://assets-global.website-files.com/636d4036709c50b9ac704e98/65aeab5274dda27fa025d70d_Rio-Innovation-Week-2024.jpg',
        url:"https://rioinnovationweek.com.br/"
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
