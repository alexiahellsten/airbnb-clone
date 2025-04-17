import { Routes } from '@angular/router';
import { ListingDetailsComponent } from './views/listing-details/listing-details.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'component-library',
    loadComponent: () => import('./pages/component-library/component-library.component').then(m => m.ComponentLibraryComponent)
  }
  path: 'listing-details',
    component: ListingDetailsComponent,
];
