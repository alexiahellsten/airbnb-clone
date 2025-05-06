import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search/search.component').then((m) => m.SearchComponent),
  },
  {
    path: 'component-library',
    loadComponent: () =>
      import('./pages/component-library/component-library.component').then(
        (m) => m.ComponentLibraryComponent
      ),
  },
  {
    path: 'listings/:id',
    loadComponent: () =>
      import('./pages/listing-details/listing-details.component').then(
        (m) => m.ListingDetailsComponent
      ),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin-panel/admin-panel.component').then(
        (m) => m.AdminPanelComponent
      ),
  },
  {
    path: 'admin/new-listing',
    loadComponent: () =>
      import('./pages/admin-panel/new-listing/new-listing.component').then(
        (m) => m.NewListingComponent
      ),
  },
  {
    path: 'booking/:id',
    loadComponent: () =>
      import('./pages/booking/booking-cart/booking-cart.component').then(
        (m) => m.BookingCartComponent
      ),
  },
  {
    path: 'booking-cart',
    loadComponent: () =>
      import('./pages/booking/booking-cart/booking-cart.component').then(
        (m) => m.BookingCartComponent
      ),
  },
  {
    path: 'booking-confirmation/:id',
    loadComponent: () =>
      import('./pages/booking/booking-confirmation/booking-confirmation.component').then(
        (m) => m.BookingConfirmationComponent
      ),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./pages/booking/checkout/checkout.component').then(
        (m) => m.CheckOutComponent
      ),
  },
];
