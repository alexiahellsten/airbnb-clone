import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-gallery-slider',
  standalone: true,
  imports: [],
  templateUrl: './image-gallery-slider.component.html',
  styleUrl: './image-gallery-slider.component.css',
})
export class ImageGallerySliderComponent {
  @Input() images: string[] = [];
  currentIndex = 0;

  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
