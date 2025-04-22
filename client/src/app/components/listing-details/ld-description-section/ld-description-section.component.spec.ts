import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdDescriptionSectionComponent } from './ld-description-section.component';

describe('LdDescriptionSectionComponent', () => {
  let component: LdDescriptionSectionComponent;
  let fixture: ComponentFixture<LdDescriptionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LdDescriptionSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LdDescriptionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
