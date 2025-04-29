import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCartComponent } from './booking-cart.component';

describe('BookingCartComponent', () => {
  let component: BookingCartComponent;
  let fixture: ComponentFixture<BookingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
