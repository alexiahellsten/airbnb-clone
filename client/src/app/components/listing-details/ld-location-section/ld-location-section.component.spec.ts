import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdLocationSectionComponent } from './ld-location-section.component';

describe('LdLocationSectionComponent', () => {
  let component: LdLocationSectionComponent;
  let fixture: ComponentFixture<LdLocationSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LdLocationSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LdLocationSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
