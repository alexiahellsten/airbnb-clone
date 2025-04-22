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
  price_per_night: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  host_id: number;
  created_at: string;
  updated_at: string;
}

export interface ListingImage {
  id: number;
  listing_id: number;
  image_url: string;
}

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${this.apiUrl}/listings`);
  }

  getListingImages(): Observable<ListingImage[]> {
    return this.http.get<ListingImage[]>(`${this.apiUrl}/listing-images`);
  }

  getListingImagesById(listing_id: number): Observable<ListingImage[]> {
    return this.http.get<ListingImage[]>(`${this.apiUrl}/listing-images?listing_id=${listing_id}`);
  }

  getAmenities(): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(`${this.apiUrl}/amenities`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }
} 