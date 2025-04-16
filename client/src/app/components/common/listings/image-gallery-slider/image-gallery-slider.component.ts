import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingBadgeComponent } from '../listing-badge/listing-badge.component';

@Component({
  selector: 'app-image-gallery-slider',
  standalone: true,
  imports: [CommonModule, ListingBadgeComponent],
  templateUrl: './image-gallery-slider.component.html',
  styleUrl: './image-gallery-slider.component.css',
})
export class ImageGallerySliderComponent {
  @Input() images: string[] = [];

  currentIndex = 0;

  get maxVisibleDots() {
    return 5;
  }

  goToPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  goToNext() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }

  isDotVisible(index: number): boolean {
    const half = Math.floor(this.maxVisibleDots / 2);
    const start = Math.max(0, this.currentIndex - half);
    const end = Math.min(this.images.length, start + this.maxVisibleDots);
    return index >= start && index < end;
  }
}
