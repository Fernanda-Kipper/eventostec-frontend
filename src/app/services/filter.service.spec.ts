import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FilterService } from './filter.service';

describe('FilterService', () => {
  let service: FilterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FilterService],
    });
    service = TestBed.inject(FilterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch locales', waitForAsync(() => {
    const mockLocales = [{ nome: 'Locale1' }, { nome: 'Locale2' }];

    service.loadLocales().subscribe((locales) => {
      expect(locales.length).toBe(2);
      expect(locales).toEqual(mockLocales);
    });

    const req = httpMock.expectOne(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockLocales);
  }));

  it('should fetch cities by state', waitForAsync(() => {
    const mockCities = [{ nome: 'City1' }, { nome: 'City2' }];
    const stateId = 1;

    service.loadCitiesByState(stateId).subscribe((cities) => {
      expect(cities.length).toBe(2);
      expect(cities).toEqual(mockCities);
    });

    const req = httpMock.expectOne(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCities);
  }));
});
