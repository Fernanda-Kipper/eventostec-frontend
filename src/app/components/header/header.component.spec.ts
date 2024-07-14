import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let searchInput: HTMLInputElement;
  let searchTermChangeSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    searchTermChangeSpy = jest.spyOn(component.searchTermChange, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial state rendering', () => {
    it('render title span text', () => {
      const span = fixture.debugElement.query(
        By.css('[data-testid="titleSpan"]'),
      );
      expect(span.nativeElement.textContent.trim()).toEqual('EventosTec');
    });

    it('render title heading text', () => {
      const h3 = fixture.debugElement.query(
        By.css('[data-testid="titleHeading"]'),
      );
      expect(h3.nativeElement.textContent.trim()).toEqual(
        'Eventos de Tecnologia 🇧🇷',
      );
    });

    it('render add event button text', () => {
      const addEventbutton = fixture.debugElement.query(
        By.css('[data-testid="addEventButton"]'),
      );
      expect(addEventbutton.nativeElement.textContent.trim()).toEqual(
        'Adicionar um evento',
      );
    });
  });

  describe('searchTermChange', () => {
    it('should not emit searchTermChange when input event is not a KeyboardEvent', () => {
      component.showSearchBar = true;
      fixture.detectChanges();

      const mockEvent = {
        target: { value: 'test' },
      } as unknown as KeyboardEvent;

      component.onSearchTerm(mockEvent);
      expect(searchTermChangeSpy).not.toHaveBeenCalled();
    });

    it('should emit searchTermChange event after 1000ms delay when input value changes', fakeAsync(() => {
      component.showSearchBar = true;
      fixture.detectChanges();

      searchInput = fixture.debugElement.query(
        By.css('[data-testid="inputSearch"]'),
      ).nativeElement;

      let searchTerm!: string | null | undefined;
      const searchInputValue = 'game';

      component.searchTermChange.pipe(first()).subscribe((text) => {
        searchTerm = text;
      });

      const keyBoardEvent = new KeyboardEvent('keyup', {
        key: searchInputValue,
      });

      searchInput.dispatchEvent(keyBoardEvent);
      searchInput.value = searchInputValue;

      tick(1000);

      expect(searchTerm).toEqual(searchInputValue);
      expect(component.searchTerm).toEqual(searchInputValue);
      expect(searchTermChangeSpy).toHaveBeenCalledWith(searchInputValue);
    }));
  });
});
