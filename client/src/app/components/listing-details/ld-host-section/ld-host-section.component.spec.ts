import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdHostSectionComponent } from './ld-host-section.component';

describe('LdHostSectionComponent', () => {
  let component: LdHostSectionComponent;
  let fixture: ComponentFixture<LdHostSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LdHostSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LdHostSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
