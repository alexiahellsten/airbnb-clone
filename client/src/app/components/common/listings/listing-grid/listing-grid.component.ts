import { Component, Input } from '@angular/core';
import { ListingCardComponent } from '../listing-card/listing-card.component';
import { CommonModule } from '@angular/common'; // Importera CommonModule

@Component({
  selector: 'app-listing-grid',
  standalone: true,
  imports: [CommonModule, ListingCardComponent],
  templateUrl: './listing-grid.component.html',
  styleUrl: './listing-grid.component.css',
})
export class ListingGridComponent {
  @Input() listings: any[] = [];
}
