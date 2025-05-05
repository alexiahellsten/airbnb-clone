import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-booking-cart',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LinkComponent],
  templateUrl: './booking-cart.component.html'
})

export class BookingCartComponent implements OnInit {
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
              start_date: '', // Kommer att ställas in av användaren
              end_date: '', // Kommer att ställas in av användaren
              total_price: listing.price_per_night,
              guests: 1,
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

  // Hämtar bokningarna från varukorgen
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

  onCancel() {  
    this.router.navigate(['/']);
  }

  onBook() {
    // Navigerar till checkout-sidan
    this.router.navigate(['/checkout']);
  }

  // Formaterar datumintervallet
  formatDateRange(startDate: string, endDate: string): string {
    if (!startDate || !endDate) return 'Välj datum';
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.getDate()}-${end.getDate()} ${start.toLocaleString('sv-SE', { month: 'long' })}`;
  }

  // Formaterar antalet gäster
  getGuestText(guests: number): string {
    return guests === 1 ? '1 gäst' : `${guests} gäster`;
  }

  // Tar bort bokningen från varukorgen
  deleteBooking(listingId: number) {
    this.bookingCartService.removeBooking(listingId);

    // Uppdaterar varukorgen efter att bokningen har tagits bort
    this.loadBookings(); 
  }
}
