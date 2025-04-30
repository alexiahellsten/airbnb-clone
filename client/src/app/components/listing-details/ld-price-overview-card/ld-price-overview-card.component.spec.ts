import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdPriceOverviewCardComponent } from './ld-price-overview-card.component';

describe('LdPriceOverviewCardComponent', () => {
  let component: LdPriceOverviewCardComponent;
  let fixture: ComponentFixture<LdPriceOverviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LdPriceOverviewCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LdPriceOverviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
