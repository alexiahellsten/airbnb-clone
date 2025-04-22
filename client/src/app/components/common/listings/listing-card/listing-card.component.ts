import { Component, Input } from '@angular/core';
import { ImageGallerySliderComponent } from '../image-gallery-slider/image-gallery-slider.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [ImageGallerySliderComponent, CommonModule, RouterModule],
  templateUrl: './listing-card.component.html',
  styleUrl: './listing-card.component.css',
})
export class ListingCardComponent {
  @Input() id: number = 0;
  @Input() images: string[] = [];
  @Input() location: string = '';
  @Input() hostType: string = '';
  @Input() date: string = '';
  @Input() price: string = '';
  @Input() rating: string = '';
  @Input() hasBadge: boolean = false; // Ny input för badge
}
