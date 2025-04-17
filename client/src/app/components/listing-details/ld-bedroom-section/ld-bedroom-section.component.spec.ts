import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdBedroomSectionComponent } from './ld-bedroom-section.component';

describe('LdBedroomSectionComponent', () => {
  let component: LdBedroomSectionComponent;
  let fixture: ComponentFixture<LdBedroomSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LdBedroomSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LdBedroomSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
