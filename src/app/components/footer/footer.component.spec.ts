import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial state rendering', () => {
    it('render copyright text', () => {
      const element = fixture.debugElement.query(
        By.css('[data-testid="copyright"]'),
      );
      expect(element.nativeElement.textContent.trim()).toEqual(
        '© 2024 KipperDev',
      );
    });

    it('render message text', () => {
      const element = fixture.debugElement.query(
        By.css('[data-testid="message"]'),
      );
      expect(element.nativeElement.textContent.trim()).toEqual(
        'Desenvolvido com 💜 pela comunidade KipperDev',
      );
    });
  });
});
