import { Component, Input, OnInit } from '@angular/core';
import { ListingCardComponent } from '../listing-card/listing-card.component';
import { CommonModule } from '@angular/common'; // Importera CommonModule
import {
  DatabaseService,
  Listing,
  ListingImage,
} from '../../../../services/database.service';

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
      // Om listings är tom, sätt listings till en tom array
      const listingArray: any[] = [];

      listings.forEach((listing) => {
        this.dbService
          .getListingImagesById(listing.id) // Hämtar bilder för varje listing
          .subscribe((images: ListingImage[]) => {
            const listingImages = images.map((img) => img.image_url); // Skapa en array med bild-URL:er

            listingArray.push({
              id: listing.id,
              images: listingImages,
              location: `${listing.city}, ${listing.country}`,
              date: new Date(listing.created_at).toLocaleDateString(),
              price: `${listing.price_per_night} kr/natt`,
              rating: (Math.random() * 2 + 3).toFixed(2),
              hasBadge: Math.random() > 0.5,
            });

            // När alla listings är inlästa – uppdatera komponentens listings-array
            if (listingArray.length === listings.length) {
              this.listings = listingArray;
            }
          });
      });
    });
  }
}
