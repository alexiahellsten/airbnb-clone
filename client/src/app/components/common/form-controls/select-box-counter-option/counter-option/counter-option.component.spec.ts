import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterOptionComponent } from './counter-option.component';

describe('CounterOptionComponent', () => {
  let component: CounterOptionComponent;
  let fixture: ComponentFixture<CounterOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterOptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
