import { Component } from '@angular/core';
import { WizardFooterComponent } from './components/wizard-footer/wizard-footer.component';

import { ListingTypeChapterComponent } from './chapters/listing-type-chapter/listing-type-chapter.component';
import { AccessTypeChapterComponent } from './chapters/access-type-chapter/access-type-chapter.component';

@Component({
  selector: 'app-new-listing',
  imports: [
    WizardFooterComponent,
    ListingTypeChapterComponent,
    AccessTypeChapterComponent,
  ],
  templateUrl: './new-listing.component.html',
  styleUrl: './new-listing.component.css',
})
export class NewListingComponent {}
