import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapacityCounterOptionComponent } from './capacity-counter-option.component';

describe('CapacityCounterOptionComponent', () => {
  let component: CapacityCounterOptionComponent;
  let fixture: ComponentFixture<CapacityCounterOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapacityCounterOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapacityCounterOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.label).toBe('');
    expect(component.description).toBe('');
    expect(component.min).toBe(0);
    expect(component.max).toBe(99);
    expect(component.value).toBe(0);
  });

  it('should increment value when increment is called', () => {
    component.value = 5;
    component.increment();
    expect(component.value).toBe(6);
  });

  it('should not increment value when at max', () => {
    component.value = component.max;
    component.increment();
    expect(component.value).toBe(component.max);
  });

  it('should decrement value when decrement is called', () => {
    component.value = 5;
    component.decrement();
    expect(component.value).toBe(4);
  });

  it('should not decrement value when at min', () => {
    component.value = component.min;
    component.decrement();
    expect(component.value).toBe(component.min);
  });

  it('should emit value change when incrementing', () => {
    spyOn(component.valueChange, 'emit');
    component.value = 5;
    component.increment();
    expect(component.valueChange.emit).toHaveBeenCalledWith(6);
  });

  it('should emit value change when decrementing', () => {
    spyOn(component.valueChange, 'emit');
    component.value = 5;
    component.decrement();
    expect(component.valueChange.emit).toHaveBeenCalledWith(4);
  });
}); 