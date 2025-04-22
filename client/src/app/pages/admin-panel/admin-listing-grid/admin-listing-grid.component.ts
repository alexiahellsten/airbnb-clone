import { Component } from '@angular/core';

import { AdminListingCardComponent } from '../admin-listing-card/admin-listing-card.component';

@Component({
  selector: 'app-admin-listing-grid',
  imports: [AdminListingCardComponent],
  templateUrl: './admin-listing-grid.component.html',
  styleUrl: './admin-listing-grid.component.css',
})
export class AdminListingGridComponent {}
