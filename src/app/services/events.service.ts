import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, catchError, of } from 'rxjs';
import { EventItem } from '../types/Event.type';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private readonly APIurl = `${environment.API}`;

  constructor(private http: HttpClient) {}
  getEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(`${this.APIurl}events`).pipe(
      catchError(() => {
        return of([]);
      }),
    );
  }

  createEvent(event: Partial<EventItem>): Observable<Partial<EventItem>> {
    return this.http.post<Partial<EventItem>>(`${this.APIurl}events`, event);
  }

  getEventById(id: string): Observable<EventItem> {
    return this.http.get<EventItem>(`${this.APIurl}events/${id}`);
  }
}
