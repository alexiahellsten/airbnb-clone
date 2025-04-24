import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListingCardComponent } from './admin-listing-card.component';

describe('AdminListingCardComponent', () => {
  let component: AdminListingCardComponent;
  let fixture: ComponentFixture<AdminListingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListingCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminListingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
