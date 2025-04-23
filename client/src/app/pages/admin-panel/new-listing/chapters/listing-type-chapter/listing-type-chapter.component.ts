import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToggleCardComponent } from '../../components/toggle-card/toggle-card.component';

@Component({
  selector: 'app-listing-type-chapter',
  imports: [CommonModule, ToggleCardComponent],
  templateUrl: './listing-type-chapter.component.html',
  styleUrl: './listing-type-chapter.component.css',
})
export class ListingTypeChapterComponent {
  selectedType: string | null = null;
  onSelectType(title: string) {
    this.selectedType = title;
  }

  types = [
    { icon: 'house-door', title: 'Hus' },
    { icon: 'building', title: 'Lägenhet' },
    { icon: 'cup-hot', title: 'Bed and breakfast' },
    { icon: 'buildings', title: 'Hotell' },
    { icon: 'fire', title: 'Tält' },
    { icon: 'houses', title: 'Bungalows' },
    { icon: 'ladder', title: 'Loft' },
    { icon: 'rocket', title: 'Rymdraket' },
    { icon: 'truck', title: 'Skåpbil' },
  ];
}
