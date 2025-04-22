import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { ButtonComponent } from '../../common/button/button.component';

@Component({
  selector: 'app-ld-amenities-section',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './ld-amenities-section.component.html',
  styleUrl: './ld-amenities-section.component.css',
})
export class LdAmenitiesSectionComponent {
  @Input() amenities: { icon: string; text: string }[] = [];

  visibleAmenitiesCount: number = 5; // Initialvärde, så den är alltid definierad

  constructor() {
    this.updateVisibleAmenitiesCount();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateVisibleAmenitiesCount();
  }

  private updateVisibleAmenitiesCount() {
    // Kollar om skärmen är större än lg
    if (window.innerWidth >= 1024) {
      this.visibleAmenitiesCount = 10; // Visa 10 objekt på skärmar större än lg
    } else {
      this.visibleAmenitiesCount = 5; // Visa 5 objekt på mindre skärmar
    }
  }
}
