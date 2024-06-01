import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventComponent } from './components/event/event.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterService } from './services/filter.service';
import { UF } from './types/UF.type';
import { ModalComponent } from './components/modal/modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { City } from './types/City.type';
import { HeaderComponent } from './header/header.component';

interface FilterForm {
  locale: FormControl,
  city: FormControl,
  from: FormControl,
  to: FormControl,

}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    EventComponent,
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    ModalComponent,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  filterForm!: FormGroup<FilterForm>;
  isModalOpen = signal(false);

  states: { id: number, label: string, value: string }[] = [];
  cities: { id: number, label: string, value: string }[] = [];

  @ViewChild('stateSelect') stateSelect: any;

  ngOnInit() {

  }
  loadCities(selectedState: number) {
    this.filterService.loadCitiesByState(selectedState).subscribe({
      next: (cities: City[]) => {
        this.cities = cities.map(city => ({id:city.id, label: city.nome, value: city.nome }));

      },
      error: (error) => {
        console.error("Error loading cities:", error);
        // Handle the error (e.g., show an error message to the user)
      }
    });
  }
  stateSelect2(event: any) {
    const selectedStateValue = this.filterForm.get('locale')!.value;
    this.loadCities(selectedStateValue);

  }


  events = [
    {
      title: 'Frontin Sampa',
      place: 'São Paulo',
      date: '19/10/2024',
      description: 'Maior evento de Frontend do Brasil!',
    },
  ];

  constructor(private filterService: FilterService) {
    this.filterForm = new FormGroup({
      locale: new FormControl(''),
      city: new FormControl(''),
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
        this.states = body.map(value => ({ "id": value.id, "label": value.nome, "value": value.sigla }))
      }
    })
  }

  submit() {
    this.isModalOpen.set(false);
    console.log(this.filterForm.value.from);
    console.log(this.filterForm.value.to);
    console.log(this.filterForm.value.locale);
  }
}
