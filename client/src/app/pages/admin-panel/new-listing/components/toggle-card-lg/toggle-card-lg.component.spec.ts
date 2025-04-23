import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleCardLgComponent } from './toggle-card-lg.component';

describe('ToggleCardLgComponent', () => {
  let component: ToggleCardLgComponent;
  let fixture: ComponentFixture<ToggleCardLgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleCardLgComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleCardLgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
