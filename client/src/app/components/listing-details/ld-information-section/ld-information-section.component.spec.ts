import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdInformationSectionComponent } from './ld-information-section.component';

describe('LdInformationSectionComponent', () => {
  let component: LdInformationSectionComponent;
  let fixture: ComponentFixture<LdInformationSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LdInformationSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LdInformationSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
