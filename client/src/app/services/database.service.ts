import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, firstValueFrom } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

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
  listingId?: number;
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
  image_url?: string;
  images?: string[];
}

export interface ListingImage {
  id: number;
  listing_id: number;
  image_url: string;
}

export interface Bedroom {
  listing_id: number;
  name: string;
  single_beds: number;
  double_beds: number;
}

export interface ListingAmenity {
  listing_id: number;
  amenity_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private apiUrl = 'http://localhost:8000/api'; // Uppdaterad API-URL
  private _amenities: Amenity[] = [];

  constructor(private http: HttpClient) {}

  get amenities(): Amenity[] {
    return this._amenities;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Something went wrong'));
  }

  getListings(): Observable<Listing[]> {
    return this.http
      .get<Listing[]>(`${this.apiUrl}/listings`)
      .pipe(catchError(this.handleError));
  }

  searchListings(query: string): Observable<Listing[]> {
    return this.http
      .get<Listing[]>(`${this.apiUrl}/search?q=${encodeURIComponent(query)}`)
      .pipe(catchError(this.handleError));
  }

  getListingById(id: number): Observable<Listing> {
    return this.http
      .get<Listing>(`${this.apiUrl}/listings/${id}`)
      .pipe(catchError(this.handleError));
  }

  getListingImages(): Observable<ListingImage[]> {
    return this.http
      .get<ListingImage[]>(`${this.apiUrl}/listing-images`)
      .pipe(catchError(this.handleError));
  }

  getListingImagesById(listing_id: number): Observable<ListingImage[]> {
    return this.http
      .get<ListingImage[]>(
        `${this.apiUrl}/listing-images?listing_id=${listing_id}`
      )
      .pipe(catchError(this.handleError));
  }

  getAmenities(): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(`${this.apiUrl}/amenities`).pipe(
      tap((amenities) => {
        this._amenities = amenities;
      }),
      catchError(this.handleError)
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.apiUrl}/categories`)
      .pipe(catchError(this.handleError));
  }

  deleteListing(id: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/listings/${id}`)
      .pipe(catchError(this.handleError));
  }

  createListing(listing: Partial<Listing>): Observable<Listing> {
    return this.http
      .post<Listing>(`${this.apiUrl}/listings`, listing)
      .pipe(catchError(this.handleError));
  }

  async createBedroom(bedroom: Bedroom): Promise<any> {
    return firstValueFrom(
      this.http
        .post(`${this.apiUrl}/bedrooms`, bedroom)
        .pipe(catchError(this.handleError))
    );
  }

  async createListingAmenity(listingAmenity: ListingAmenity): Promise<any> {
    return firstValueFrom(
      this.http
        .post(`${this.apiUrl}/listing-amenities`, listingAmenity)
        .pipe(catchError(this.handleError))
    );
  }

  // Lägg till en metod för att skapa en bild i listing_images
  createListingImage(imageData: {
    listing_id: number;
    image_url: string;
  }): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/listing-images`, imageData)
      .pipe(catchError(this.handleError));
  }
}
