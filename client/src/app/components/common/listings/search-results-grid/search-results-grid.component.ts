import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ListingCardComponent } from '../listing-card/listing-card.component';
import { CommonModule } from '@angular/common';
import {
  DatabaseService,
  Listing,
  ListingImage,
} from '../../../../services/database.service';

@Component({
  selector: 'app-search-results-grid',
  standalone: true,
  imports: [CommonModule, ListingCardComponent],
  templateUrl: './search-results-grid.component.html'
})
export class SearchResultsGridComponent implements OnInit, OnChanges {
  // Tar emot en lista av annonser som indata från förälderkomponenten search.component.ts
  @Input() listings: Listing[] = [];
  
  // Lista som används för att visa annonser med förberedda värden
  processedListings: any[] = [];
  
  //Visar laddningsstatus
  isLoading: boolean = true;

  //Visar felmeddelande om det uppstår ett fel
  error: string | null = null;

  //Tar emot en instans av DatabaseService via dependency injection
  constructor(private dbService: DatabaseService) {}

  //Körs när komponenten initieras
  ngOnInit(): void {
    this.processListings();
  }

  //Körs när komponenten uppdateras
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listings']) {
      this.processListings();
    }
  }

  //Tar emot en lista av annonser som indata från förälderkomponenten search.component.ts
  private processListings() {
    if (!this.listings?.length) {
      this.processedListings = [];
      this.isLoading = false;
      return;
    }

    //Börjar om processen - visar laddningsstatus och återställer fel
    this.isLoading = true;
    this.error = null;
    this.processedListings = [];

    try {
       // Bearbetar varje annons till ett enklare objekt för visning i gränssnittet
      this.processedListings = this.listings.map(listing => ({
        id: listing.id,
        images: listing.images || [],
        location: `${listing.city}, ${listing.country}`,
        hostType: 'Värd',
        date: new Date(listing.created_at).toLocaleDateString(),
        price: `${listing.price_per_night} kr/natt`,
        rating: (Math.random() * 2 + 3).toFixed(2),
        hasBadge: Math.random() > 0.5,
      }));
    } catch (error) {
      //Visar felmeddelande om det uppstår ett fel
      console.error('Fel vid hämtning av annonser:', error);
      this.error = 'Ett fel uppstod vid hämtning av annonser. Försök igen senare.';
    } finally {
      // Oavsett om det gick bra eller inte så avslutas laddningen
      this.isLoading = false;
    }
  }
} 