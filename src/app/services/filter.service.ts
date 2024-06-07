import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UF } from '../types/UF.type';
import { City } from '../types/City.type';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private httpClient: HttpClient) {}

  loadLocales(): Observable<UF[]> {
    return this.httpClient
      .get<UF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .pipe(map((ufs) => ufs.sort((a, b) => a.nome.localeCompare(b.nome))));
  }

  loadCitiesByState(stateId: number): Observable<City[]> {
    return this.httpClient
      .get<
        City[]
      >(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`)
      .pipe(
        map((cities) => cities.sort((a, b) => a.nome.localeCompare(b.nome))),
      );
  }
}
