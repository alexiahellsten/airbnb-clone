import { Component } from '@angular/core';

import { ListingTypeChapterComponent } from './chapters/listing-type-chapter/listing-type-chapter.component';
import { WizardFooterComponent } from './components/wizard-footer/wizard-footer.component';
@Component({
  selector: 'app-new-listing',
  imports: [ListingTypeChapterComponent, WizardFooterComponent],
  templateUrl: './new-listing.component.html',
  styleUrl: './new-listing.component.css',
})
export class NewListingComponent {}
