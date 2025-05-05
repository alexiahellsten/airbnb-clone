import { Component, OnInit, viewChild } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '../../../components/common/button/button.component';
import { LinkComponent } from '../../../components/common/link/link.component';
import { BookingCartService } from '../../../services/booking-cart.service';
import { DatabaseService } from '../../../services/database.service';

interface Booking {
  user_id: number;
  listing_id: number;
  start_date: string;
  end_date: string;
  total_price: number;
  guests: number;
  status: string;
  listing_name?: string;
}

import { ModalLgComponent } from '../../../components/common/modal-lg/modal-lg.component';
import { CounterOptionComponent } from '../../../components/common/form-controls/select-box-counter-option/counter-option/counter-option.component';
import { TextInputComponent } from '../../../components/common/form-controls/text-input/text-input.component';

@Component({
  selector: 'app-booking-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LinkComponent,
    ButtonComponent,
    ModalLgComponent,
    CounterOptionComponent,
    TextInputComponent,
  ],
  templateUrl: './booking-cart.component.html',
  styleUrl: './booking-cart.component.css',
})
export class BookingCartComponent implements OnInit {
  @ViewChild('guestModal') guestModal!: ModalLgComponent;
  @ViewChild('dateModal') dateModal!: ModalLgComponent;

  // Datum
  checkIn: string = new Date().toISOString().slice(0, 10);
  checkOut: string = (() => {
    const plus7 = new Date();
    plus7.setDate(plus7.getDate() + 7);
    return plus7.toISOString().slice(0, 10);
  })();

  // Gäster
  adults: number = 1;
  children: number = 0;
  infants: number = 0;
  pets: number = 0;

  // Bokningar i varukorgen
  bookings: Booking[] = [];
  // Totalpris för alla bokningar
  totalPrice: number = 0;
  // Om bokningarna laddas  
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookingCartService: BookingCartService,
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const listingId = +params['id'];
      
      if (listingId) {
        // Hämtar boendet från databasen
        this.databaseService.getListingById(listingId).subscribe({
          next: (listing) => {
            // Skapar initiala bokningsdata
            const booking: Booking = {
              user_id: 1, 
              listing_id: listing.id,
              start_date: this.checkIn,
              end_date: this.checkOut,
              total_price: listing.price_per_night,
              guests: this.adults + this.children,
              status: 'Väntar på bekräftelse',
              listing_name: listing.title
            };

            // Lägger till i varukorgen
            this.bookingCartService.setBookingData(booking);
            this.loadBookings();
          },
          error: () => {
            this.isLoading = false;
          }
        });
      } else {
        // Visar varukorgen
        this.loadBookings();
      }
    });
  }

  private loadBookings() {
    this.bookings = this.bookingCartService.getBookingData();
    
    // Hämtar listing-details för boendet från databasen för varje bokning
    this.bookings.forEach(booking => {
      if (!booking.listing_name) {
        this.databaseService.getListingById(booking.listing_id).subscribe({
          next: (listing) => {
            booking.listing_name = listing.title;
            // Uppdaterar bokningen i varukorgen
            this.bookingCartService.setBookingData(booking);
          }
        });
      }
    });
    
    this.calculateTotalPrice();
    this.isLoading = false;
  }

  calculateTotalPrice() {
    this.totalPrice = this.bookings.reduce((sum, booking) => sum + booking.total_price, 0);
  }

  openGuestModal() {
    this.guestModal.open();
  }

  openDateModal() {
    this.dateModal.open();
  }

  saveDates() {
    // Uppdatera bokningar med nya datum
    this.bookings.forEach(booking => {
      booking.start_date = this.checkIn;
      booking.end_date = this.checkOut;
      this.bookingCartService.setBookingData(booking);
    });
    this.dateModal.close();
  }

  cancelDates() {
    this.dateModal.close();
  }

  saveGuests() {
    // Uppdatera bokningar med nya gäster
    this.bookings.forEach(booking => {
      booking.guests = this.adults + this.children;
      this.bookingCartService.setBookingData(booking);
    });
    this.guestModal.close();
  }

  cancelGuests() {
    this.guestModal.close();
  }

  onCancel() {  
    this.router.navigate(['/']);
  }

  onBook() {
    // Navigerar till checkout-sidan
    this.router.navigate(['/checkout']);
  }

  formatDateRange(startDate: string, endDate: string): string {
    if (!startDate || !endDate) return 'Välj datum';
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.getDate()}-${end.getDate()} ${start.toLocaleString('sv-SE', { month: 'long' })}`;
  }

  getGuestText(guests: number): string {
    return guests === 1 ? '1 gäst' : `${guests} gäster`;
  }

  deleteBooking(listingId: number) {
    this.bookingCartService.removeBooking(listingId);
    this.loadBookings(); 
  }
}
