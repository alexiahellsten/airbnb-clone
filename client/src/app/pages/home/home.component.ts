import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService, Listing } from '../../services/database.service';

import { ListingGridComponent } from '../../components/common/listings/listing-grid/listing-grid.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListingGridComponent],
  templateUrl: './home.component.html',
  // styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  listings: Listing[] = [];

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.db.getListings().subscribe(data => {
      this.listings = data;
    });
  }

  //Laddar alla bilder när det behövs
  loadAllImages(listing: Listing) {
    if (!('all_images' in listing)) {
      this.db.getListingImagesById(listing.id).subscribe(images => {
        (listing as any).all_images = images.map(img => img.image_url);
      });
    }
  }
}
