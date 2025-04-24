import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListingGridComponent } from './admin-listing-grid.component';

describe('AdminListingGridComponent', () => {
  let component: AdminListingGridComponent;
  let fixture: ComponentFixture<AdminListingGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListingGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminListingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
