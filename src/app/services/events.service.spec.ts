import { TestBed, waitForAsync } from '@angular/core/testing';

import { EventsService } from './events.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EventItem } from '../types/Event.type';
import {
  CREATE_EVENT_ERROR_RESPONSE_MOCK,
  EVENT_MOCK,
} from '../../__mocks__/events';
import { HttpErrorResponse } from '@angular/common/http';

describe('EventsService', () => {
  let eventsService: EventsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventsService],
    });
    eventsService = TestBed.inject(EventsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(eventsService).toBeTruthy();
  });

  describe('getEvents', () => {
    it('should return a list of events', () => {
      let events: EventItem[] | undefined;
      eventsService.getEvents().subscribe((body) => {
        events = body;
      });

      const req = httpMock.expectOne('http://localhost:3000/events');
      req.flush([EVENT_MOCK]);

      expect(events).toEqual([EVENT_MOCK]);
      expect(req.request.method).toEqual('GET');
    });

    it('should return a list of events using waitForAsync', waitForAsync(() => {
      eventsService.getEvents().subscribe((response) => {
        expect(response).toEqual([EVENT_MOCK]);
      });
      const req = httpMock.expectOne('http://localhost:3000/events');

      req.flush([EVENT_MOCK]);
      expect(req.request.method).toEqual('GET');
    }));
  });

  describe('getEventsById', () => {
    it('should return a event', () => {
      let event: EventItem | null = null;
      eventsService.getEventById(EVENT_MOCK.id).subscribe((body) => {
        event = body;
      });

      const req = httpMock.expectOne('http://localhost:3000/events/1');
      req.flush(EVENT_MOCK);

      expect(event).toEqual(EVENT_MOCK);
      expect(req.request.method).toEqual('GET');
    });

    it('should return a event using waitForAsync', waitForAsync(() => {
      eventsService.getEventById(EVENT_MOCK.id).subscribe((response) => {
        expect(response).toEqual(EVENT_MOCK);
      });

      const req = httpMock.expectOne('http://localhost:3000/events/1');

      req.flush(EVENT_MOCK);
      expect(req.request.method).toEqual('GET');
    }));
  });

  describe('createEvent', () => {
    it('should create a event', () => {
      let event: Partial<EventItem> | undefined;
      const mockedEventItem = EVENT_MOCK as Partial<EventItem>;
      eventsService.createEvent(mockedEventItem).subscribe((response) => {
        event = response;
      });
      const req = httpMock.expectOne('http://localhost:3000/events');

      req.flush(EVENT_MOCK);

      expect(event).toEqual(EVENT_MOCK);
      expect(req.request.method).toEqual('POST');
    });

    it('passes the correct body', () => {
      const mockedEventItem = EVENT_MOCK as Partial<EventItem>;
      eventsService.createEvent(mockedEventItem).subscribe();
      const req = httpMock.expectOne('http://localhost:3000/events');

      req.flush(EVENT_MOCK);

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toBe(mockedEventItem);
    });

    it('throws an error if request fails', () => {
      let httpErrorResponse: HttpErrorResponse | undefined;
      const mockedEventItem = EVENT_MOCK as Partial<EventItem>;
      eventsService.createEvent(mockedEventItem).subscribe({
        next: () => {
          fail('Failed to create a new event!');
        },
        error: (error) => (httpErrorResponse = error),
      });
      const req = httpMock.expectOne('http://localhost:3000/events');
      req.flush('Server error', CREATE_EVENT_ERROR_RESPONSE_MOCK);

      if (!httpErrorResponse) {
        throw new Error('Error needs to be defined');
      }

      expect(httpErrorResponse.status).toEqual(422);
      expect(httpErrorResponse.statusText).toEqual('Unprocessible entity');
    });
  });
});
