import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdAmenitiesSectionComponent } from './ld-amenities-section.component';

describe('LdAmenitiesSectionComponent', () => {
  let component: LdAmenitiesSectionComponent;
  let fixture: ComponentFixture<LdAmenitiesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LdAmenitiesSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LdAmenitiesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
