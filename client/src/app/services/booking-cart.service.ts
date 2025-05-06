import { Injectable } from '@angular/core';

// Interface för gästantal
export interface GuestCount {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

// Interface för bokningsdata
export interface Booking {
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

@Injectable({
  providedIn: 'root'
})

// Service för att hantera bokningsdata
export class BookingCartService {
  private bookings: Booking[] = [];

  constructor() {
    // Ladda bokningar från localStorage vid initialisering av servicen
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      this.bookings = JSON.parse(savedBookings);
    }
  }

  // Sätter bokningsdata
  setBookingData(booking: Booking) {
    // Kontrollera om bokning för annonsen redan finns
    const existingIndex = this.bookings.findIndex(booking => booking.listing_id === booking.listing_id);
    
    if (existingIndex >= 0) {
      // Uppdatera befintlig bokning
      this.bookings[existingIndex] = booking;
    } else {
      // Lägg till ny bokning
      this.bookings.push(booking);
    }

    // Spara till localStorage
    this.saveToLocalStorage();
  }

  // Hämtar bokningsdata
  getBookingData(): Booking[] {
    return this.bookings;
  }

  // Hämtar specifik bokning baserat på listing_id
  getBookingByListingId(listingId: number): Booking | undefined {
    return this.bookings.find(booking => booking.listing_id === listingId);
  }

  // Tar bort bokningsdata
  removeBooking(listingId: number) {
    this.bookings = this.bookings.filter(booking => booking.listing_id !== listingId);
    this.saveToLocalStorage();
  }

  // Tar bort alla bokningar
  clearBookings() {
    this.bookings = [];
    this.saveToLocalStorage();
  }

  // Sparar bokningar till localStorage
  private saveToLocalStorage() {
    localStorage.setItem('bookings', JSON.stringify(this.bookings));
  }
} 