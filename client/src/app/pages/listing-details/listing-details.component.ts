import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LdAmenitiesSectionComponent } from '../../components/listing-details/ld-amenities-section/ld-amenities-section.component';
import { LdBedroomSectionComponent } from '../../components/listing-details/ld-bedroom-section/ld-bedroom-section.component';
import { ListingGridComponent } from '../../components/common/listings/listing-grid/listing-grid.component';
import { ListingBadgeComponent } from '../../components/common/listings/listing-badge/listing-badge.component';
import { ListingCardComponent } from '../../components/common/listings/listing-card/listing-card.component';
//import { ImageGallerySliderComponent } from '../../components/common/listings/image-gallery-slider/image-gallery-slider.component';
import { FooterComponent } from '../../components/common/footer/footer.component';
import { DatabaseService } from '../../services/database.service'; // Import only the service
import { LdHeaderSectionComponent } from '../../components/listing-details/ld-header-section/ld-header-section.component';

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
    //ImageGallerySliderComponent,
    FooterComponent,
    LdHeaderSectionComponent
  ],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.css'
})
export class ListingDetailsComponent implements OnInit {
  listingImages: any[] = [];
  amenities: any[] = [];
  headerData: any;
  
  constructor(private databaseService: DatabaseService) {}
  
ngOnInit(): void {
  this.databaseService.getListingImages().subscribe({
    next: (response) => {
      console.log('Raw API response:', response);
      this.listingImages = response;
      
      if (response && response.length > 0) {
        console.log('First image object structure:', response[0]);
        
        setTimeout(() => {
          this.listingImages = [
            { imageUrl: 'https://placehold.co/600x400' }
          ];
        }, 5000); 
      }
    },
    error: (error) => {
      console.error('Error fetching images:', error);
    }
  });
}
}