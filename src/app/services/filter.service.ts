import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UF } from '../types/UF.type';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private httpClient: HttpClient) {}

  loadLocales(): Observable<UF[]>{
    return this.httpClient.get<UF[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  }
}
