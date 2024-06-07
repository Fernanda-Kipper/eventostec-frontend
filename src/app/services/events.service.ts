import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, catchError, of } from 'rxjs';
import { DataEvent } from '../types/dataEvent';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private readonly APIurl = `${environment.API}`;

  constructor(private http: HttpClient) {}

  getEvents(): Observable<DataEvent[]> {
    return this.http.get<DataEvent[]>(`${this.APIurl}events`).pipe(
      catchError((error) => {
        console.error('Erro ao carregar dados.', error);
        return of([]);
      }),
    );
  }

  createEvent(event: DataEvent[]) {
    return this.http.post(`${this.APIurl}events`, event);
  }
}
