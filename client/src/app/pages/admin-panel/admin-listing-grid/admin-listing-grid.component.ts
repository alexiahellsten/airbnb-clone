import { Component, Input } from '@angular/core';
import { AdminListingCardComponent } from '../admin-listing-card/admin-listing-card.component';
import { Listing } from '../../../services/database.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-admin-listing-grid',
  imports: [AdminListingCardComponent, NgFor],
  templateUrl: './admin-listing-grid.component.html',
  styleUrl: './admin-listing-grid.component.css',
})
export class AdminListingGridComponent {
  // Array of listings to be displayed in the admin panel
  // This will be populated by the database service
  @Input() listings: Listing[] = [];
}
