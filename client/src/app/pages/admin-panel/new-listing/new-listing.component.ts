import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WizardFooterComponent } from './components/wizard-footer/wizard-footer.component';
import {
  DatabaseService,
  Listing,
  Bedroom,
  ListingAmenity,
} from '../../../services/database.service';
import { HttpClient } from '@angular/common/http';

import { ListingTypeChapterComponent } from './chapters/listing-type-chapter/listing-type-chapter.component';
import { AccessTypeChapterComponent } from './chapters/access-type-chapter/access-type-chapter.component';
import { TitleChapterComponent } from './chapters/title-chapter/title-chapter.component';
import { LocationChapterComponent } from './chapters/location-chapter/location-chapter.component';
import { PricePerNightChapterComponent } from './chapters/price-per-night-chapter/price-per-night-chapter.component';
import { DescriptionChapterComponent } from './chapters/description-chapter/description-chapter.component';
import { ImagesChapterComponent } from './chapters/images-chapter/images-chapter.component';
import { CapacityChapterComponent } from './chapters/capacity-chapter/capacity-chapter.component';
import { AmenitiesChapterComponent } from './chapters/amenities-chapter/amenities-chapter.component';
import { ButtonComponent } from '../../../components/common/button/button.component';

@Component({
  selector: 'app-new-listing',
  standalone: true,
  imports: [
    CommonModule,
    WizardFooterComponent,
    ListingTypeChapterComponent,
    AccessTypeChapterComponent,
    TitleChapterComponent,
    LocationChapterComponent,
    PricePerNightChapterComponent,
    DescriptionChapterComponent,
    ImagesChapterComponent,
    CapacityChapterComponent,
    AmenitiesChapterComponent,
    ButtonComponent,
  ],
  templateUrl: './new-listing.component.html',
  styleUrl: './new-listing.component.css',
})
export class NewListingComponent {
  listing: Partial<Listing> = {
    title: '',
    description: '',
    address: '',
    city: '',
    country: '',
    price_per_night: 0,
    max_guests: 0,
    bedrooms: 0,
    bathrooms: 0,
    host_id: 1,
  };

  bedroomDetails: { name: string; single_beds: number; double_beds: number }[] =
    [];
  selectedAmenities: string[] = [];
  isSubmitting = false;
  errorMessage = '';
  images: File[] = [];
  imageUrls: string[] = [];

  constructor(
    private databaseService: DatabaseService,
    private router: Router,
    private http: HttpClient // Lägg till HttpClient
  ) {}

  onTitleChange(title: string) {
    this.listing.title = title;
  }

  onAddressChange(address: string) {
    this.listing.address = address;
  }

  onCityChange(city: string) {
    this.listing.city = city;
  }

  onCountryChange(country: string) {
    this.listing.country = country;
  }

  onDescriptionChange(description: string) {
    this.listing.description = description;
  }

  onPriceChange(price: number) {
    this.listing.price_per_night = price;
  }

  onMaxGuestsChange(maxGuests: number) {
    this.listing.max_guests = maxGuests;
  }

  onBathroomsChange(bathrooms: number) {
    this.listing.bathrooms = bathrooms;
  }

  onBedroomsChange(bedrooms: number) {
    this.listing.bedrooms = bedrooms;
  }

  onBedroomDetailsChange(
    bedroomDetails: { name: string; single_beds: number; double_beds: number }[]
  ) {
    this.bedroomDetails = bedroomDetails;
  }

  onSelectedAmenitiesChange(amenities: string[]) {
    this.selectedAmenities = amenities;
  }

  // Metod för att hantera filval
  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      this.images = Array.from(files); // Sätt de valda bilderna
      console.log('Valda bilder:', this.images); // Lägg till denna logg för att kontrollera bilderna
    }
  }

  onSubmit() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.errorMessage = '';

    // Validera obligatoriska fält
    if (
      !this.listing.title ||
      !this.listing.description ||
      !this.listing.address ||
      !this.listing.city ||
      !this.listing.country ||
      !this.listing.price_per_night
    ) {
      this.errorMessage = 'Vänligen fyll i alla obligatoriska fält';
      this.isSubmitting = false;
      return;
    }

    console.log('Skickar listing:', this.listing);
    console.log('Sovrumsdetaljer:', this.bedroomDetails);
    console.log('Valda bekvämligheter:', this.selectedAmenities);

    // Skapa först listingen
    this.databaseService.createListing(this.listing).subscribe({
      next: (createdListing) => {
        console.log('Listing skapad:', createdListing);

        if (!createdListing.listingId) {
          console.error('Inget listingId mottaget från servern');
          this.errorMessage = 'Fel: Inget listing-ID mottaget från servern';
          this.isSubmitting = false;
          return;
        }

        const listingId = createdListing.listingId; // Nu vet TypeScript att detta är ett nummer

        // Skapa sedan sovrumsdetaljerna
        const bedroomPromises = this.bedroomDetails.map((bedroom) => {
          const bedroomData: Bedroom = {
            ...bedroom,
            listing_id: listingId,
          };
          console.log('Skapar sovrum:', bedroomData);
          return this.databaseService.createBedroom(bedroomData);
        });

        // Skapa listing_amenities poster
        const amenityPromises = this.selectedAmenities.map((amenityName) => {
          const amenityData: ListingAmenity = {
            listing_id: listingId,
            amenity_name: amenityName,
          };
          console.log('Skapar bekvämlighet:', amenityData);
          return this.databaseService.createListingAmenity(amenityData);
        });

        Promise.all([...bedroomPromises, ...amenityPromises])
          .then(() => {
            console.log('Alla detaljer skapade');
            // Navigera till admin-panelen
            this.router.navigate(['/admin']);
          })
          .catch((error) => {
            console.error('Fel vid skapande av detaljer:', error);
            this.errorMessage =
              'Fel vid skapande av listingdetaljer. Försök igen.';
            this.isSubmitting = false;
          });
      },
      error: (error) => {
        console.error('Fel vid skapande av listing:', error);
        this.errorMessage =
          error.message || 'Fel vid skapande av listing. Försök igen.';
        this.isSubmitting = false;
      },
    });
  }
}
