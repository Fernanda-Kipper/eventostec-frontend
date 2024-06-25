import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;

    component.isModalOpen = signal(false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial state rendering', () => {
    it('should not render component when model is closed', () => {
      component.isModalOpen.set(false);
      fixture.detectChanges();

      const modalContainerElement = fixture.debugElement.query(
        By.css('[data-testid="modalContainer"]'),
      );

      expect(modalContainerElement).toEqual(null);
    });

    it('should render component when model is opened', () => {
      component.isModalOpen.set(true);
      fixture.detectChanges();

      const modalContainerElement = fixture.debugElement.query(
        By.css('[data-testid="modalContainer"]'),
      );

      expect(modalContainerElement.nativeElement).toBeDefined();
    });
  });
});
