import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService, Listing } from '../../services/database.service';
import { SearchResultsGridComponent } from '../../components/common/listings/search-results-grid/search-results-grid.component';

@Component({
  selector: 'app-search',                                   // HTML-taggen för att använda denna komponent
  standalone: true,                                          // Gör komponenten fristående (ingen modul behövs)
  imports: [CommonModule, SearchResultsGridComponent],      // Importerar nödvändiga moduler och komponenter
  templateUrl: './search.component.html',                    // HTML-mall
  styleUrl: './search.component.css'                         // CSS för komponentens utseende
})

export class SearchComponent implements OnInit {
  // Söksträng från URL
  searchQuery: string = '';

  // Resultaten från sökningen (annonserna)
  searchResults: Listing[] = [];

  // Visar laddningsstatus
  isLoading: boolean = true;

  // Felmeddelande vid problem
  errorMessage: string = '';

  // Tar emot ActivatedRoute för att läsa URL och DatabaseService för att söka
  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService
  ) {}

  // Livscykelmetod - Körs en gång när komponenten initialiseras och inputs är inställda
  ngOnInit() {
    // Lyssnar på query-parametrar i URL:en, t.ex. ?q=stockholm
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';   // Hämtar söksträngen, eller tom om ingen finns

      // Om det finns en söksträng utförs sökningen – annars slutar laddningen
      if (this.searchQuery) {
        this.performSearch();
      } else {
        this.isLoading = false;
      }
    });
  }

  // Utför sökning baserat på `searchQuery`
  private performSearch() {
    this.isLoading = true;                // Visar att laddning pågår
    this.errorMessage = '';              // Återställer felmeddelande

    // Använder databasservice för att söka efter annonserna
    this.databaseService.searchListings(this.searchQuery).subscribe({
      next: (listings) => {
        this.searchResults = listings;   // Sätter resultat
        this.isLoading = false;          // Avslutar laddning
      },
      error: (error) => {
        // Visar felmeddelande vid misslyckad förfrågan
        console.error('Fel vid sökning:', error);
        this.errorMessage = 'Kunde inte ansluta till servern. Kontrollera din internetanslutning och försök igen.';
        this.isLoading = false;
      }
    });
  }

  // Getter som returnerar söksträngen med stor bokstav i början
  get capitalizedSearchQuery(): string {
    if (!this.searchQuery) return '';
    return this.searchQuery.charAt(0).toUpperCase() + this.searchQuery.slice(1);
  }
}
