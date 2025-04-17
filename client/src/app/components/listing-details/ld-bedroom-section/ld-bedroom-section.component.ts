import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { SliderArrowButtonComponent } from '../../common/slider-arrow-button/slider-arrow-button.component';

@Component({
  selector: 'app-ld-bedroom-section',
  standalone: true,
  imports: [CommonModule, SliderArrowButtonComponent],
  templateUrl: './ld-bedroom-section.component.html',
  styleUrls: ['./ld-bedroom-section.component.css'],
})
export class LdBedroomSectionComponent {
  bedroomItems = [
    { name: 'Sovrum 1', beds: '2 enkelsängar' },
    { name: 'Sovrum 2', beds: '4 enkelsängar' },
    { name: 'Sovrum 3', beds: '2 enkelsängar' },
    { name: 'Sovrum 4', beds: '1 enkelsäng' },
    { name: 'Sovrum 5', beds: '2 enkelsängar' },
    { name: 'Sovrum 6', beds: '2 enkelsängar' },
  ];

  currentIndex = 0;
  itemsPerPage = 2;

  goToPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  goToNext() {
    const maxIndex = this.bedroomItems.length - this.itemsPerPage;
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
    }
  }

  getSliderTransform(): string {
    return `translateX(-${(100 / this.itemsPerPage) * this.currentIndex}%)`;
  }

  getNumberOfBeds(beds: string): number {
    const match = beds.match(/\d+/);
    return match ? parseInt(match[0], 10) : 1;
  }
}
