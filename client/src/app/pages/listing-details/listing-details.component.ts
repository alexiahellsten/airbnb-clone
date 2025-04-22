import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LdAmenitiesSectionComponent } from '../../components/listing-details/ld-amenities-section/ld-amenities-section.component';
import { LdBedroomSectionComponent } from '../../components/listing-details/ld-bedroom-section/ld-bedroom-section.component';
import { ListingGridComponent } from '../../components/common/listings/listing-grid/listing-grid.component';
import { ListingBadgeComponent } from '../../components/common/listings/listing-badge/listing-badge.component';
import { ListingCardComponent } from '../../components/common/listings/listing-card/listing-card.component';
import { FooterComponent } from '../../components/common/footer/footer.component';
import { DatabaseService, Listing, ListingImage } from '../../services/database.service';
import { LdHeaderSectionComponent } from '../../components/listing-details/ld-header-section/ld-header-section.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listing-details',
  standalone: true,
  imports: [
    CommonModule,
    LdAmenitiesSectionComponent,
    LdBedroomSectionComponent,
    ListingGridComponent,
    ListingBadgeComponent,
    ListingCardComponent,
    FooterComponent,
    LdHeaderSectionComponent
  ],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.css'
})

export class ListingDetailsComponent implements OnInit {
  amenities: any[] = [];
  headerData: any = { 
    title: 'Laddar...',
    description: '',
    location: '',
    price: 0,
    guests: 0,
    bedrooms: 0,
    bathrooms: 0
  };
  
  listing_id: number | null = null;
  currentListing: Listing | null = null;
  listingImages: ListingImage[] = [];
  isLoading: boolean = true;
  

  constructor(
    //Injicerar databasen så data kan hämtas från databasen
    private databaseService: DatabaseService,

    //Läser parametrar från URL:en
    private route: ActivatedRoute
  ) {}
  
  //Komponentens livscykelstart - körs vid initiering av komponenten
  ngOnInit(): void {
    this.route.params.subscribe(params => {

      //Hämtar ID från URL:en
      const id = params['id'];
      
      //Kontrollerar om ID är giltigt & inte är NaN
      if (id && !isNaN(+id)) {

        //Sparar ID i listing_id
        this.listing_id = +id;

        //Hämtar data från databasen
        this.fetchListingDetails();
      } else {

        //Om ID inte är giltigt, sätts laddningsindikatorn till false
        this.isLoading = false;
      }
    });
  }

  //Hämtar annonsdata från databasen
  private fetchListingDetails(): void {
    this.databaseService.getListings().subscribe({

      //En del av observable-prenumerationen, används för att hämta asynkron data från databasen
      //next körs vid lyckat svar, error körs vid fel, complete körs när all data hämtats
      next: (listings) => {

        //Hämtar annonsdata från databasen
        const listing = listings.find(l => l.id === this.listing_id);
        
        //Kontrollerar om annonsdata finns
        if (listing) {

          //Sparar annonsdata i currentListing
          this.currentListing = listing;

          //Uppdaterar headerdata (som skickas in i ld-header-section)
          this.updateHeaderData(listing);

          //Hämtar bilderna från databasen
          this.fetchListingImages();
        } else {

          //Om annonsdata inte finns, sätts laddningsindikatorn till false
          this.isLoading = false;
        }
      },
      error: () => {

        //Om det uppstår ett fel, sätts laddningsindikatorn till false
        this.isLoading = false;
      }
    });
  }

  //Uppdaterar headerData (skickas in i ld-header-section via headerData)
  private updateHeaderData(listing: Listing): void {
    this.headerData = {
      title: listing.title,
      description: listing.description,
      location: `${listing.city}, ${listing.country}`,
      price: listing.price_per_night,
      guests: listing.max_guests,
      bedrooms: listing.bedrooms,
      bathrooms: listing.bathrooms
    };
  }

  //Hämtar bilderna från databasen
  private fetchListingImages(): void {

    //Kontrollerar om listing_id är giltigt
    if (this.listing_id !== null) {

      //Observable för att hämta bilderna från databasen via listing_id
      this.databaseService.getListingImagesById(this.listing_id).subscribe({

        //next körs vid lyckat svar, error körs vid fel
        next: (images) => {

          //Sparar bilderna i listingImages-arrayen
          this.listingImages = images;

          //Sätts laddningsindikatorn till false
          this.isLoading = false;
        },
          error: () => {

          //Om det uppstår ett fel, sätts laddningsindikatorn till false
          this.isLoading = false;
        }
      });
    }
  }
}