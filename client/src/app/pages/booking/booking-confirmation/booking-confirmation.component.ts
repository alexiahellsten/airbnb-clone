import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookingService, Booking } from '../../../services/booking.service';

@Component({
  selector: 'app-booking-confirmation',                          
  standalone: true,                                              
  imports: [CommonModule],                                      
  templateUrl: './booking-confirmation.component.html',          
  styleUrl: './booking-confirmation.component.css'               
})

export class BookingConfirmationComponent implements OnInit {

  // Array som innehålleralla bokningar
  bookings: Booking[] = [];   
  loading = true;                
  error: string | null = null;      

  // Konstruktor som skapar en ny instans av BookingConfirmationComponent
  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  // Metod som körs när komponenten initieras
  ngOnInit() {

    // Hämtar boknings-ID:n från URL:en
    this.route.queryParams.subscribe({
      next: async (params) => {
        const bookingIds = params['ids']?.split(',') || [];
        if (bookingIds.length > 0) {
          // Hämtar bokningsinformationen för alla bokningar
          await this.loadBookings(bookingIds);
        } else {
          this.error = 'Inga bokningar hittades';
          this.loading = false;
        }
      },
      error: (error) => {
        this.error = 'Misslyckades med att hämta bokningsinformation'; 
        this.loading = false;
        console.error('Fel vid hämtning av bokningsinformation:', error);
      }
    });
  }

  // Metod som hämtar bokningsinformationen för alla bokningar
  private async loadBookings(ids: string[]) {
    try {
      // Hämtar alla bokningar parallellt
      const bookingPromises = ids.map(id => this.bookingService.getBookingById(Number(id)));
      this.bookings = await Promise.all(bookingPromises);
      this.loading = false;
    } catch (error) {
      this.error = 'Misslyckades med att hämta bokningsinformation';
      this.loading = false;
      console.error('Fel vid hämtning av bokningsinformation:', error);
    }
  }

  // Metod som beräknar det totala priset för alla bokningar
  getTotalPrice(): number {
    return this.bookings.reduce((sum, booking) => sum + booking.total_price, 0);
  }
}
