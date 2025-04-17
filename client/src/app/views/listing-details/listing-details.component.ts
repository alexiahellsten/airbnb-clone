import { Component } from '@angular/core';

//Components
import { LdAmenitiesSectionComponent } from '../../components/listing-details/ld-amenities-section/ld-amenities-section.component';
import { LdBedroomSectionComponent } from '../../components/listing-details/ld-bedroom-section/ld-bedroom-section.component';
import { FooterComponent } from '../../components/common/footer/footer.component';
@Component({
  selector: 'app-listing-details',
  imports: [
    LdAmenitiesSectionComponent,
    LdBedroomSectionComponent,
    FooterComponent,
  ],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.css',
})
export class ListingDetailsComponent {}
