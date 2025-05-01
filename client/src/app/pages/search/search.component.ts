import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService, Listing } from '../../services/database.service';
import { ListingGridComponent } from '../../components/common/listings/listing-grid/listing-grid.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ListingGridComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent implements OnInit {
  searchQuery: string = '';
  searchResults: Listing[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService
  ) {}

  /* ngOnInit() är en livscykel-hook som körs en gång, direkt efter att
  Angular har kontrollerat komponentens inputs för första gången */
  ngOnInit() {
    // Lyssnar på URL-parametrar
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      if (this.searchQuery) {
        this.performSearch();
      } else {
        this.isLoading = false;
      }
    });
  }

  private performSearch() {
    this.isLoading = true;
    this.errorMessage = '';

    this.databaseService.getListings().subscribe({
      next: (listings) => {
        try {
          this.searchResults = listings.filter(listing =>
            listing.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            listing.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            listing.city.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            listing.country.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        } catch (error) {
          this.errorMessage = 'Ett fel uppstod vid filtrering av sökresultat';
          console.error('Fel vid filtrering:', error);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Fel vid sökning:', error);
        this.errorMessage = 'Kunde inte ansluta till servern. Kontrollera din internetanslutning och försök igen.';
        this.isLoading = false;
      }
    });
  }

  get capitalizedSearchQuery(): string {
    if (!this.searchQuery) return '';
    return this.searchQuery.charAt(0).toUpperCase() + this.searchQuery.slice(1);
  }

}
