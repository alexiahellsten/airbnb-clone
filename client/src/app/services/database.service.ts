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

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  private apiUrl = 'http://localhost:4200/api';

  constructor(private http: HttpClient) {}

  getAmenities(): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(`${this.apiUrl}/amenities`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }
} 