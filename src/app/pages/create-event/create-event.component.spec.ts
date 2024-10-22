import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { EVENT_MOCK } from '../../../__mocks__/events';
import { EventsService } from '../../services/events.service';
import { FilterService } from '../../services/filter.service';
import { GlobalMessageService } from '../../services/global-message.service';
import { EventType } from '../../types/Event.type';
import { CreateEventComponent } from './create-event.component';

describe('CreateEventComponent', () => {
  let component: CreateEventComponent;
  let fixture: ComponentFixture<CreateEventComponent>;
  let globalMessageServiceSpy: jest.Mocked<GlobalMessageService>;
  let eventsServiceSpy: jest.Mocked<EventsService>;
  let filterServiceSpy: jest.Mocked<FilterService>;
  let routerSpy: jest.Mocked<Router>;

  beforeEach(async () => {
    globalMessageServiceSpy = jest.createMockFromModule<GlobalMessageService>(
      '../../services/global-message.service',
    ) as jest.Mocked<GlobalMessageService>;
    globalMessageServiceSpy.addSuccessMessage = jest.fn();
    globalMessageServiceSpy.addErrorMessage = jest.fn();
    globalMessageServiceSpy.addWarningMessage = jest.fn();
    globalMessageServiceSpy.addInfoMessage = jest.fn();
    eventsServiceSpy = jest.createMockFromModule<EventsService>(
      '../../services/events.service',
    ) as jest.Mocked<EventsService>;
    eventsServiceSpy.getEvents = jest.fn().mockReturnValue(of([EVENT_MOCK]));
    eventsServiceSpy.createEvent = jest.fn();
    filterServiceSpy = jest.createMockFromModule<FilterService>(
      '../../services/filter.service',
    ) as jest.Mocked<FilterService>;
    filterServiceSpy.loadLocales = jest
      .fn()
      .mockReturnValue(of([{ id: 1, nome: 'Distrito Federal', sigla: 'DF' }]));
    filterServiceSpy.loadCitiesByState = jest
      .fn()
      .mockReturnValue(of([{ id: 1, nome: 'Brasilia' }]));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CreateEventComponent],
      providers: [
        MessageService,
        { provide: GlobalMessageService, useValue: globalMessageServiceSpy },
        { provide: EventsService, useValue: eventsServiceSpy },
        { provide: FilterService, useValue: filterServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    expect(component.createEventForm).toBeDefined();
    expect(component.createEventForm.get('title')).not.toBeNull();
    expect(component.createEventForm.get('type')?.value).toBe(
      EventType.PRESENTIAL,
    );
  });

  it("should update today's date", () => {
    component.updateTodayDate();
    const today = new Date().toISOString().split('T')[0];
    expect(component.todayDate).toBe(today);
  });

  it('should validate the date correctly', () => {
    component.createEventForm.get('date')?.setValue('2030-01-01');
    component.dateValidator();
    expect(component.validDate).toBe(true);

    component.createEventForm.get('date')?.setValue('1990-01-01');
    component.dateValidator();
    expect(component.validDate).toBe(false);
  });

  it('should call createEvent on the service when form is valid', () => {
    component.createEventForm.patchValue({
      title: EVENT_MOCK.title,
      description: EVENT_MOCK.description,
      date: EVENT_MOCK.date,
      city: EVENT_MOCK.city,
      state: EVENT_MOCK.state,
      bannerFile: new File([], 'test.png'),
    });
    eventsServiceSpy.createEvent.mockReturnValue(of({}));

    component.createEvent();

    expect(eventsServiceSpy.createEvent).toHaveBeenCalled();
  });

  it('should set locale as string correctly', () => {
    component.states = [{ id: 1, label: 'Distrito Federal', value: 'DF' }];
    component.cities = [{ id: 1, label: 'Brasilia', value: 'Brasilia' }];
    component.createEventForm.patchValue({ state: '1', city: '1' });

    component.setLocaleAsString();

    expect(component.createEventForm.value.state).toBe('DF');
    expect(component.createEventForm.value.city).toBe('Brasilia');
  });

  it('should update form value on file change', () => {
    const testFile = new File(['test'], 'test.png', { type: 'image/png' });
    const event = { target: { files: [testFile] } } as unknown as Event;
    component.fileChange(event);
    expect(component.createEventForm.get('bannerFile')?.value).toBe(testFile);
  });

  it('should handle event type change correctly', () => {
    component.handleEventType(EventType.ONLINE);
    expect(component.createEventForm.get('type')?.value).toBe(EventType.ONLINE);
    expect(component.createEventForm.get('state')?.validator).toBeNull();
    expect(component.createEventForm.get('city')?.validator).toBeNull();

    component.handleEventType(EventType.PRESENTIAL);
    expect(component.createEventForm.get('type')?.value).toBe(
      EventType.PRESENTIAL,
    );
    expect(component.createEventForm.get('state')?.validator).not.toBeNull();
    expect(component.createEventForm.get('city')?.validator).not.toBeNull();
  });

  it('should update validators based on shouldSetValidators', () => {
    const stateControl = component.createEventForm.get('state');
    const cityControl = component.createEventForm.get('city');

    component.updateValidators(true);
    expect(stateControl?.validator).not.toBeNull();
    expect(cityControl?.validator).not.toBeNull();

    component.updateValidators(false);
    expect(stateControl?.value).toBeNull();
    expect(cityControl?.value).toBeNull();
    expect(stateControl?.validator).toBeNull();
    expect(cityControl?.validator).toBeNull();
  });
});
