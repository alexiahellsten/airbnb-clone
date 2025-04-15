import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingBadgeComponent } from './listing-badge.component';

describe('ListingBadgeComponent', () => {
  let component: ListingBadgeComponent;
  let fixture: ComponentFixture<ListingBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListingBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
