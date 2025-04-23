import { Component, OnInit } from '@angular/core';
import { DatabaseService, Listing } from '../../services/database.service';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { AdminListingGridComponent } from './admin-listing-grid/admin-listing-grid.component';

@Component({
  selector: 'app-admin-panel',
  imports: [IconButtonComponent, AdminListingGridComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent implements OnInit {
  listings: Listing[] = [];

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.databaseService.getListings().subscribe({
      next: (listings) => {
        this.listings = listings;
      },
      error: (error) => {
        console.error('Error fetching listings:', error);
      }
    });
  }
}
