import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { SelectBoxCounterOptionComponent } from '../../common/form-controls/select-box-counter-option/select-box-counter-option.component';
import { CounterOptionComponent } from '../../common/form-controls/select-box-counter-option/counter-option/counter-option.component';
import { TextInputComponent } from '../../common/form-controls/text-input/text-input.component';
import { ButtonComponent } from '../../common/button/button.component';
import { BookingCartService } from '../../../services/booking-cart.service';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-ld-price-overview-card',
  standalone: true,
  imports: [
    FormsModule,
    SelectBoxCounterOptionComponent,
    CounterOptionComponent,
    TextInputComponent,
    ButtonComponent,
  ],
  templateUrl: './ld-price-overview-card.component.html',
  styleUrls: ['./ld-price-overview-card.component.css'],
})
export class LdPriceOverviewCardComponent implements OnInit {
  // Hämtar boendeinformation från databasen
  @Input() set listingId(value: number | null) {
    this._listingId = value || 0;
  }
  get listingId(): number {
    return this._listingId;
  }
  private _listingId: number = 0;

  @Input() set pricePerNight(value: number | undefined) {
    this._pricePerNight = value || 1400;
  }
  get pricePerNight(): number {
    return this._pricePerNight;
  }
  private _pricePerNight: number = 1400;

  // Definiera värdena
  checkInDate: string = '';
  checkOutDate: string = '';
  cleaningFee: number = 1200; // Städavgift
  airbnbServiceFee: number = 1944; // Airbnb serviceavgift
  
  // Värden för gästerna
  adults: number = 1;
  children: number = 0;
  infants: number = 0;
  pets: number = 0;

  // Beräkna totaler
  get totalGuests(): number {
    return this.adults + this.children + this.infants;
  }

  get totalPriceForNights(): number {
    return this.pricePerNight * this.nights;
  }

  get totalAmount(): number {
    return this.totalPriceForNights + this.cleaningFee + this.airbnbServiceFee;
  }

  // Validera datumformat och logik
  private validateDates(): boolean {
    console.log('Validating dates:', {
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      checkInType: typeof this.checkInDate,
      checkOutType: typeof this.checkOutDate
    });

    if (!this.checkInDate || !this.checkOutDate) {
      console.error('Vänligen välj in- och utcheckningsdatum');
      return false;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(this.checkInDate) || !dateRegex.test(this.checkOutDate)) {
      console.error('Felaktigt datumformat. Använd formatet ÅÅÅÅ-MM-DD');
      return false;
    }

    const checkIn = new Date(this.checkInDate);
    const checkOut = new Date(this.checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      console.error('Incheckningsdatumet kan inte vara i det förflutna');
      return false;
    }

    if (checkOut <= checkIn) {
      console.error('Utcheckningsdatumet måste vara efter incheckningsdatumet');
      return false;
    }

    // Beräkna antal nätter utan att tilldela till nights
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // Om du behöver lagra antalet nätter, kan du skapa en ny variabel
    // this._nights = diffDays; // Om du skapar en privat variabel

    return true;
  }

  get nights(): number {
    if (this.checkInDate && this.checkOutDate) {
      const inDate = new Date(this.checkInDate);
      const outDate = new Date(this.checkOutDate);
      const diff = outDate.getTime() - inDate.getTime();
      return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
    }
    return 1; // Returnera 1 om inga datum är angivna
  }

  constructor(
    private router: Router,
    private bookingCartService: BookingCartService,
    private databaseService: DatabaseService
  ) {}

  ngOnInit(): void {// Sätt defaultdatum
    const today = new Date();
    this.checkInDate = today.toISOString().slice(0, 10);
    const plus7 = new Date();
    plus7.setDate(today.getDate() + 7);
    this.checkOutDate = plus7.toISOString().slice(0, 10);
  }

  onGuestsChange(guests: { adults: number; children: number; infants: number; pets: number }): void {
    this.adults = guests.adults;
    this.children = guests.children;
    this.infants = guests.infants;
    this.pets = guests.pets;
  }

  // Funktion för att navigera till bokningssidan
  proceedToBooking(): void {
    if (!this.listingId) {
      console.error('Inget boende-ID kunde hämtas');
      return;
    }

    if (!this.validateDates()) {
      return;
    }

    // Hämta information om boendet från databasen
    this.databaseService.getListingById(this.listingId).subscribe({
      next: (listing) => {
        // Sparar initiala bokningsdata
        const bookingData = {
          user_id: 1, 
          listing_id: this.listingId,
          start_date: this.checkInDate,
          end_date: this.checkOutDate,
          total_price: this.totalAmount,
          guests: this.totalGuests,
          status: 'Väntar på bekräftelse',
          listing_name: listing.title
        };
        
        this.bookingCartService.setBookingData(bookingData);

        // Navigera till varukorgen
        this.router.navigate(['/booking-cart']);
      },
      error: (error) => {
        console.error('Fel vid hämtning av boende:', error);
      }
    });
  }
}
