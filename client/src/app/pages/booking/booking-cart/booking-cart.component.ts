import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { LinkComponent } from '../../../components/common/link/link.component';
import { ButtonComponent } from '../../../components/common/button/button.component';
import { ModalLgComponent } from '../../../components/common/modal-lg/modal-lg.component';
import { CounterOptionComponent } from '../../../components/common/form-controls/select-box-counter-option/counter-option/counter-option.component';
import { TextInputComponent } from '../../../components/common/form-controls/text-input/text-input.component';
import { BookingCartService, GuestCount } from '../../../services/booking-cart.service';
import { DatabaseService } from '../../../services/database.service';

interface Booking {
  user_id: number;
  listing_id: number;
  start_date: string;
  end_date: string;
  total_price: number;
  guests: number;
  guest_details: GuestCount;
  status: string;
  listing_name?: string;
}

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

  // Aktuell bokning som redigeras
  currentBooking: Booking | null = null;
  // Temporära värden för att spåra ändringar
  private tempGuestValues: GuestCount | null = null;
  private tempDateValues: { start_date: string; end_date: string } | null = null;

  openGuestModal(booking: Booking) {
    this.currentBooking = booking;
    // Sätt initiala värden från den aktuella bokningen
    this.adults = booking.guest_details.adults;
    this.children = booking.guest_details.children;
    this.infants = booking.guest_details.infants;
    this.pets = booking.guest_details.pets;
    // Spara de ursprungliga värdena
    this.tempGuestValues = { ...booking.guest_details };
    this.guestModal.open();
  }

  // Hantera när modalen stängs
  onGuestModalClose() {
    if (this.currentBooking) {
      // Kontrollera om värdena har ändrats
      const hasChanges = 
        this.adults !== this.tempGuestValues?.adults ||
        this.children !== this.tempGuestValues?.children ||
        this.infants !== this.tempGuestValues?.infants ||
        this.pets !== this.tempGuestValues?.pets;

      if (hasChanges) {
        // Uppdatera gästinformationen i den aktuella bokningen
        this.currentBooking.guest_details = {
          adults: this.adults,
          children: this.children,
          infants: this.infants,
          pets: this.pets
        };
        // Uppdatera totalt antal gäster
        this.currentBooking.guests = this.adults + this.children + this.infants;
        // Spara den uppdaterade bokningen
        this.bookingCartService.setBookingData(this.currentBooking);
        // Uppdatera bokningslistan
        this.loadBookings();
      }
    }
    // Återställ temporära värden
    this.tempGuestValues = null;
  }

  openDateModal(booking: Booking) {
    this.currentBooking = booking;
    // Sätt initiala värden från den aktuella bokningen
    this.checkIn = booking.start_date;
    this.checkOut = booking.end_date;
    // Spara de ursprungliga värdena
    this.tempDateValues = {
      start_date: booking.start_date,
      end_date: booking.end_date
    };
    this.dateModal.open();
  }

  saveDates() {
    if (this.currentBooking) {
      // Kontrollera om värdena har ändrats
      const hasChanges = 
        this.checkIn !== this.tempDateValues?.start_date ||
        this.checkOut !== this.tempDateValues?.end_date;

      if (hasChanges) {
        // Uppdatera datum i den aktuella bokningen
        this.currentBooking.start_date = this.checkIn;
        this.currentBooking.end_date = this.checkOut;
        // Spara den uppdaterade bokningen
        this.bookingCartService.setBookingData(this.currentBooking);
        // Uppdatera bokningslistan
        this.loadBookings();
      }
    }
    // Återställ temporära värden
    this.tempDateValues = null;
    // Stäng modalen
    this.dateModal.close();
  }

  cancelDates() {
    // Återställ till ursprungliga värden
    if (this.tempDateValues) {
      this.checkIn = this.tempDateValues.start_date;
      this.checkOut = this.tempDateValues.end_date;
    }
    this.dateModal.close();
  }

  onDateModalClose() {
    // När modalen stängs via X eller utanför, spara ändringarna
    this.saveDates();
  }

  saveGuests() {
    if (this.currentBooking) {
      // Uppdatera gästinformationen i den aktuella bokningen
      this.currentBooking.guest_details = {
        adults: this.adults,
        children: this.children,
        infants: this.infants,
        pets: this.pets
      };
      // Uppdatera totalt antal gäster
      this.currentBooking.guests = this.adults + this.children + this.infants;
      // Spara den uppdaterade bokningen
      this.bookingCartService.setBookingData(this.currentBooking);
      // Uppdatera bokningslistan
      this.loadBookings();
    }
    this.guestModal.close();
  }

  cancelGuests() {
    // Återställ till ursprungliga värden
    if (this.tempGuestValues) {
      this.adults = this.tempGuestValues.adults;
      this.children = this.tempGuestValues.children;
      this.infants = this.tempGuestValues.infants;
      this.pets = this.tempGuestValues.pets;
    }
    this.guestModal.close();
  }

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
    this.route.params.subscribe((params) => {
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
              guest_details: {
                adults: 1,
                children: 0,
                infants: 0,
                pets: 0
              },
              status: 'Väntar på bekräftelse',
              listing_name: listing.title,
            };

            // Lägger till i varukorgen
            this.bookingCartService.setBookingData(booking);
            this.loadBookings();
          },
          error: () => {
            this.isLoading = false;
          },
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
    this.bookings.forEach((booking) => {
      if (!booking.listing_name) {
        this.databaseService.getListingById(booking.listing_id).subscribe({
          next: (listing) => {
            booking.listing_name = listing.title;
            // Uppdaterar bokningen i varukorgen
            this.bookingCartService.setBookingData(booking);
          },
        });
      }
    });

    this.calculateTotalPrice();
    this.isLoading = false;
  }

  calculateTotalPrice() {
    this.totalPrice = this.bookings.reduce(
      (sum, booking) => sum + booking.total_price,
      0
    );
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
    return `${start.getDate()}-${end.getDate()} ${start.toLocaleString(
      'sv-SE',
      { month: 'long' }
    )}`;
  }

  // Formaterar gästinformation
  getGuestText(booking: Booking): string {
    const details = booking.guest_details;
    const total = details.adults + details.children + details.infants;
    let text = total === 1 ? '1 gäst' : `${total} gäster`;
    
    // Lägg till detaljer om barn och spädbarn om de finns
    const detailsText = [];
    if (details.children > 0) {
      detailsText.push(`${details.children} barn`);
    }
    if (details.infants > 0) {
      detailsText.push(`${details.infants} spädbarn`);
    }
    if (details.pets > 0) {
      detailsText.push(`${details.pets} husdjur`);
    }
    
    if (detailsText.length > 0) {
      text += ` (${detailsText.join(', ')})`;
    }
    
    return text;
  }

  // Tar bort bokningen från varukorgen
  deleteBooking(listingId: number) {
    this.bookingCartService.removeBooking(listingId);

    // Uppdaterar varukorgen efter att bokningen har tagits bort
    this.loadBookings();
  }
}
