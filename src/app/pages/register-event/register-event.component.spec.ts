import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEventComponent } from './register-event.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegisterEventComponent', () => {
  let component: RegisterEventComponent;
  let fixture: ComponentFixture<RegisterEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterEventComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
