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

  // booking är en typ av Booking eller null som ska innehålla bokningsobjektet
  booking: Booking | null = null;   

  // loading är en boolean som visar om innehållet laddas
  loading = true;                
  error: string | null = null;      

  // Konstruktor som tar inActivatedRoute för att läsa parametrar från URL:en, och en tjänst för att hämta bokningen
  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  // Livscykel-hook som körs när komponenten initieras för att hämta boknings-ID från URL:en
  ngOnInit() {
    // Prenumererar på parametrar i URL:en (tex: /booking/123)
    this.route.params.subscribe({

      // Om parametrarna hämtas korrekt så körs next
      next: async (params) => {
        const bookingId = params['id']; // Hämtar boknings-ID från parametern
        if (bookingId) {
          await this.loadBooking(bookingId); // Hämtar bokningen från servern
        } else {
          // Om inget ID finns visas ett felmeddelande
          this.error = 'Ingen bokning med detta ID hittades';
          this.loading = false;
        }
      },
      // Om något går fel vid hämtning av URL-parametrar
      error: (error) => {
        this.error = 'Misslyckades med att hämta bokningsinformation'; 
        this.loading = false;
        console.error('Fel vid hämtning av bokningsinformation:', error);
      }
    });
  }

  // Metod som hämtar bokningsinformation baserat på ID
  private async loadBooking(id: number) {
    try {
      // Använder bokningstjänsten för att hämta bokningen
      this.booking = await this.bookingService.getBookingById(id);

      // Avslutar laddning om allt gick bra
      this.loading = false; 
    } catch (error) {
      // Om något går fel vid hämtning av bokning
      this.error = 'Misslyckades med att hämta bokningsinformation';
      this.loading = false;
      console.error('Fel vid hämtning av bokningsinformation:', error); 
    }
  }
}
