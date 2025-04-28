import { Component } from '@angular/core';
import { WizardFooterComponent } from './components/wizard-footer/wizard-footer.component';

import { ListingTypeChapterComponent } from './chapters/listing-type-chapter/listing-type-chapter.component';
import { AccessTypeChapterComponent } from './chapters/access-type-chapter/access-type-chapter.component';
import { TitleChapterComponent } from './chapters/title-chapter/title-chapter.component';
import { LocationChapterComponent } from './chapters/location-chapter/location-chapter.component';
import { PricePerNightChapterComponent } from './chapters/price-per-night-chapter/price-per-night-chapter.component';
@Component({
  selector: 'app-new-listing',
  imports: [
    WizardFooterComponent,
    ListingTypeChapterComponent,
    AccessTypeChapterComponent,
    TitleChapterComponent,
    LocationChapterComponent,
    PricePerNightChapterComponent,
  ],
  templateUrl: './new-listing.component.html',
  styleUrl: './new-listing.component.css',
})
export class NewListingComponent {}
