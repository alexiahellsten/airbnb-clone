import { Component } from '@angular/core';

import { IconButtonComponent } from './icon-button/icon-button.component';
import { AdminListingGridComponent } from './admin-listing-grid/admin-listing-grid.component';

@Component({
  selector: 'app-admin-panel',
  imports: [IconButtonComponent, AdminListingGridComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent {}
