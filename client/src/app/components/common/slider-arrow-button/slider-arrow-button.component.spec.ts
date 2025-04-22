import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderArrowButtonComponent } from './slider-arrow-button.component';

describe('SliderArrowButtonComponent', () => {
  let component: SliderArrowButtonComponent;
  let fixture: ComponentFixture<SliderArrowButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderArrowButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderArrowButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
