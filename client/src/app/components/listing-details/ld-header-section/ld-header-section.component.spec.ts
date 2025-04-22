import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdHeaderSectionComponent } from './ld-header-section.component';

describe('LdHeaderSectionComponent', () => {
  let component: LdHeaderSectionComponent;
  let fixture: ComponentFixture<LdHeaderSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LdHeaderSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LdHeaderSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
