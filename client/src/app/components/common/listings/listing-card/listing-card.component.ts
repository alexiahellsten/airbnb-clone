import { Component } from '@angular/core';
import { ImageGallerySliderComponent } from '../image-gallery-slider/image-gallery-slider.component';
import { ListingBadgeComponent } from '../listing-badge/listing-badge.component';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [ImageGallerySliderComponent, ListingBadgeComponent],
  templateUrl: './listing-card.component.html',
  styleUrl: './listing-card.component.css',
})
export class ListingCardComponent {}
