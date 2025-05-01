import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DatabaseService,
  Listing,
  ListingImage,
} from '../../../../services/database.service';
import { ListingCardComponent } from '../listing-card/listing-card.component';

@Component({
  selector: 'app-listing-grid',
  standalone: true,
  imports: [CommonModule, ListingCardComponent],
  templateUrl: './listing-grid.component.html',
  styleUrl: './listing-grid.component.css',
})

export class ListingGridComponent implements OnInit {

  //Input-array för listings
  @Input() listings: any[] = [];

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    // Hämtar alla annonser från databasen
    this.dbService.getListings().subscribe((listings: Listing[]) => {
       // Temporär array för att lagra formaterade annonser
      const listingArray: any[] = [];

      // Går igenom varje listing och hämtar bilderna för aktuella annonsen
      listings.forEach((listing) => {
        this.dbService.getListingImagesById(listing.id).subscribe((images: ListingImage[]) => {

          // Lägger till formaterad listing med bilder (kompletta objekt krävs för bildgalleriet)
          listingArray.push({
            id: listing.id,
            images: images, // skickar hela bildobjekten så komponenten kan använda image.image_url
            location: `${listing.city}, ${listing.country}`, // Kombinerar stad och land
            date: new Date(listing.created_at).toLocaleDateString(), // Formaterar datum
            price: `${listing.price_per_night} kr/natt`, // Lägger till pris med "kr/natt"
            rating: (Math.random() * 2 + 3).toFixed(2), // Skapar ett slumpmässigt betyg (3.00 - 5.00)
            hasBadge: Math.random() > 0.5, // Slumpmässigt om listing har "gästfavorit"-badge
          });

          // När alla listings är färdigladdade uppdateras listings-arrayen
          if (listingArray.length === listings.length) {
            this.listings = listingArray;
          }
        });
      });
    });
  }
}
