import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventComponent } from './event.component';
import { EVENT_MOCK } from '../../../__mocks__/events';
import { By } from '@angular/platform-browser';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;

    // Set initial input`s
    component.title = EVENT_MOCK.title;
    component.type = EVENT_MOCK.remote ? 'Online' : 'Presencial';
    component.description = EVENT_MOCK.description;
    component.date = EVENT_MOCK.date;
    component.city = EVENT_MOCK.city ?? '';
    component.state = EVENT_MOCK.state ?? '';
    component.bannerUrl = EVENT_MOCK.imgUrl;
    component.url = EVENT_MOCK.eventUrl;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial state rendering', () => {
    it('should render banner image', () => {
      const imageElement = fixture.debugElement.query(
        By.css('[data-testid="bannerImg"]'),
      );

      expect(imageElement.attributes['alt']).toEqual('banner do evento');
      expect(imageElement.attributes['src']).toEqual(
        'https://www.proway.com.br/foto/png/blog/750/workshop-gratuito-game-developer.jpg',
      );
    });

    it('should render state and city detail', () => {
      const stateAndCityElement = fixture.debugElement.query(
        By.css('[data-testid="stateAndCity"]'),
      );
      const typeElement = fixture.debugElement.query(
        By.css('[data-testid="type"]'),
      );

      expect(stateAndCityElement).toBeDefined();
      expect(typeElement).toBe(null);
      expect(stateAndCityElement.nativeElement.textContent.trim()).toEqual(
        'RJ, Angra dos Reis',
      );
    });
  });
});
