import { Component, OnInit, Input } from '@angular/core';
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
  styleUrl: './ld-price-overview-card.component.css',
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
  nights: number = 1; // Antal nätter
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

  constructor(
    private router: Router,
    private bookingCartService: BookingCartService,
    private databaseService: DatabaseService
  ) {}

  ngOnInit(): void {}

  onGuestsChange(guests: { adults: number; children: number; infants: number; pets: number }): void {
    this.adults = guests.adults;
    this.children = guests.children;
    this.infants = guests.infants;
    this.pets = guests.pets;
  }

  proceedToBooking(): void {
    if (!this.listingId) {
      console.error('Inget boende-ID kunde hämtas');
      return;
    }

    // Hämta listing-detaljer från databasen
    this.databaseService.getListingById(this.listingId).subscribe({
      next: (listing) => {
        // Sparar initiala bokningsdata
        const bookingData = {
          user_id: 1, 
          listing_id: this.listingId,
          start_date: '', // Kommer att ställas in i booking-komponenten
          end_date: '', // Kommer att ställas in i booking-komponenten
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
