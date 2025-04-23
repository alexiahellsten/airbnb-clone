import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardFooterComponent } from './wizard-footer.component';

describe('WizardFooterComponent', () => {
  let component: WizardFooterComponent;
  let fixture: ComponentFixture<WizardFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WizardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
