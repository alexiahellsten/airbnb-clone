import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingGridComponent } from '../../components/common/listings/listing-grid/listing-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListingGridComponent],
  templateUrl: './home.component.html',
  // styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
