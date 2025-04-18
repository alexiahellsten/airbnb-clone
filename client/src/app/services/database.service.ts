import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: string;
  selected: boolean;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export interface Listing {
  id: number;
  title: string;
  description: string;
  address: string;
  city: string;
  country: string;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  hostId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListingImage {
  id: number;
  listingId: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  private apiUrl = 'http://localhost:4200/api';

  constructor(private http: HttpClient) {}

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${this.apiUrl}/listings`);
  }

  getListingImages(): Observable<ListingImage[]> {
    return this.http.get<ListingImage[]>(`${this.apiUrl}/listing-images`);
  }

  getAmenities(): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(`${this.apiUrl}/amenities`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }
} 