import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBoxCounterOptionComponent } from './select-box-counter-option.component';

describe('SelectBoxCounterOptionComponent', () => {
  let component: SelectBoxCounterOptionComponent;
  let fixture: ComponentFixture<SelectBoxCounterOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectBoxCounterOptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectBoxCounterOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
