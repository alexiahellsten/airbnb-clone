import { Injectable } from '@angular/core';

export interface Booking {
  id: number;
  user_id: number;
  listing_id: number;
  start_date: string;
  end_date: string;
  total_price: number;
  guests: number;
  status: 'Väntar på bekräftelse' | 'Bekräftad' | 'Avbruten';
  created_at: string;
  listing_title?: string;
  listing_address?: string;
}

@Injectable({
  providedIn: 'root'
})

// Tjänst för att hämta bokningsinformation
export class BookingService {
  private apiUrl = '/api';

  // Hämtar bokningsinformation baserat på ID
  async getBookingById(id: number): Promise<Booking> {
    const response = await fetch(`${this.apiUrl}/bookings/${id}`);
    if (!response.ok) {
      throw new Error('Misslyckades med att hämta bokningsinformation');
    }
    return response.json();
  }

  // Asynkron metod för att skapa en ny bokning genom att skicka in ett bokningsobjekt
  async createBooking(booking: Omit<Booking, 'id' | 'created_at' | 'listing_title' | 'listing_address'>): Promise<Booking> {
    const response = await fetch(`${this.apiUrl}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Skickar in bokningsobjektet som JSON
      body: JSON.stringify(booking),
    });
    
    // Om svaret inte är "ok" så kastas ett fel
    if (!response.ok) {
      throw new Error('Misslyckades med att skapa bokningen');
    }
    // Om svaret är "ok" så returneras bokningsobjektet som JSON
    return response.json();
  }
} 