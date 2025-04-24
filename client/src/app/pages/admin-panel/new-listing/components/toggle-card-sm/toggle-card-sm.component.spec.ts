import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleCardSmComponent } from './toggle-card-sm.component';

describe('ToggleCardSmComponent', () => {
  let component: ToggleCardSmComponent;
  let fixture: ComponentFixture<ToggleCardSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleCardSmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleCardSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
