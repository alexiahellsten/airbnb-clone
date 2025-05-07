import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Listing } from '../../../services/database.service';
import { DatabaseService } from '../../../services/database.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-listing-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './admin-listing-card.component.html',
  styleUrl: './admin-listing-card.component.css',
})
export class AdminListingCardComponent {
  @Input() listing!: Listing;
  @Output() deleted = new EventEmitter<number>();

  constructor(private db: DatabaseService) {}

  onDeleteClick() {
    if (confirm(`Vill du verkligen ta bort "${this.listing.title}"?`)) {
      this.db.deleteListing(this.listing.id).subscribe({
        next: () => {
          alert('Listning borttagen!');
          this.deleted.emit(this.listing.id); // Emit the ID of the deleted listing
        },
        error: () => alert('Något gick fel vid borttagning!'),
      });
    }
  }
}
