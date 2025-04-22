import { Component, Input, OnInit } from '@angular/core';
import { ListingCardComponent } from '../listing-card/listing-card.component';
import { CommonModule } from '@angular/common'; // Importera CommonModule
import { DatabaseService, Listing, ListingImage } from '../../../../services/database.service';


@Component({
  selector: 'app-listing-grid',
  standalone: true,
  imports: [CommonModule, ListingCardComponent],
  templateUrl: './listing-grid.component.html',
  styleUrl: './listing-grid.component.css',
})


export class ListingGridComponent implements OnInit {
  @Input() listings: any[] = [];

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {

    //Hämtar listings
    this.dbService.getListings().subscribe((listings: any[]) => {

      //Hämtar listing-images
      this.dbService.getListingImages().subscribe((images: ListingImage[]) => {
        
      //För varje listing - lägg till relaterade bilder som matchar listing ID */
        this.listings = listings.map(listing => {
          const listingImages = images

          //Filtrerar ut bilder som tillhör den nuvarande annonsen
            .filter(img => img.listingId === listing.id)

          //Hämtar ut imageUrl-fältet från varje filtrerad bild & sparar det i arrayen listingImages
            .map(img => img.imageUrl);
    
          return {
            id: listing.id,
            images: listingImages,
            location: `${listing.city}, ${listing.country}`,
            hostType: 'Privat värd',
            date: new Date(listing.created_at).toLocaleDateString(), 
            price: `${listing.price_per_night} kr/natt`, 
            
            //Returnerar slumpmässiga värden för rating & om annonsen är en gästfavorit
            rating: (Math.random() * 2 + 3).toFixed(2),
            hasBadge: Math.random() > 0.5,
          };
        });
      });
    });
    
  }
}