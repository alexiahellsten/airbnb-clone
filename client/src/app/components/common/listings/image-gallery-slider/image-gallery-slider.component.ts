import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingBadgeComponent } from '../listing-badge/listing-badge.component';

@Component({
  selector: 'app-image-gallery-slider',
  standalone: true,
  imports: [CommonModule, ListingBadgeComponent],
  templateUrl: './image-gallery-slider.component.html',
  styleUrls: ['./image-gallery-slider.component.css']
})

export class ImageGallerySliderComponent implements OnChanges {
  @Input() images: any[] = [];
  @Input() hasBadge: boolean = false;
  
  currentIndex: number = 0;
  imageUrls: string[] = [];
  maxVisibleDots: number = 5;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'] && this.images && this.images.length > 0) {
      this.imageUrls = this.images.map(img => 
        typeof img === 'string' ? img : img.image_url
      );
    }
  }
  
  goToPrevious(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
  
  goToNext(): void {
    if (this.currentIndex < this.imageUrls.length - 1) {
      this.currentIndex++;
    }
  }
  
  isDotVisible(index: number): boolean {
    return Math.abs(index - this.currentIndex) <= 2;
  }
  
  handleImageError(event: any): void {
    console.error('Image failed to load:', event.target.src);
    event.target.src = 'https://placehold.co/600x400';
  }
}