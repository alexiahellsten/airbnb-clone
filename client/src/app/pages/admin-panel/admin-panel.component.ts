import { Component, OnInit } from '@angular/core';
import { DatabaseService, Listing } from '../../services/database.service';

import { IconButtonComponent } from './icon-button/icon-button.component';
import { AdminListingGridComponent } from './admin-listing-grid/admin-listing-grid.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  imports: [IconButtonComponent, AdminListingGridComponent, RouterLink],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})

// The AdminPanelComponent is responsible for displaying the admin panel
// It fetches the listings from the database and displays them in a grid format
export class AdminPanelComponent implements OnInit {
  //Array of listings to be displayed in the admin panel
  // This will be populated by the database service
  listings: Listing[] = [];

  // Inject the DatabaseService to fetch listings from the database
  // The DatabaseService is responsible for making HTTP requests to the backend
  constructor(private databaseService: DatabaseService) {}

  // On component initialization, fetch the listings from the database
  // The getListings method of the DatabaseService returns an observable
  ngOnInit() {
    this.databaseService.getListings().subscribe({
      next: (listings) => {
        this.listings = listings;
      },
      error: (error) => {
        console.error('Error fetching listings:', error);
      },
    });
  }
}
