import { Component, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalLgComponent } from '../../common/modal-lg/modal-lg.component';
import { LinkComponent } from '../../common/link/link.component';

@Component({
  selector: 'app-ld-description-section',
  imports: [CommonModule, ModalLgComponent, LinkComponent],
  templateUrl: './ld-description-section.component.html',
  styleUrls: ['./ld-description-section.component.css'],
})
export class LdDescriptionSectionComponent {
  @Input() description!: string; // Input för hela beskrivningen
  @ViewChild('modalDescription') modalDescription!: ModalLgComponent;
  isModalOpen = false; // Flagga för att hantera om modalen är öppen

  openModal() {
    this.isModalOpen = true; // När modalen öppnas, sätt flaggan till true
    // Skicka hela description till modalen
    if (this.modalDescription) {
      this.modalDescription.description = this.description; // Skickar hela texten till modalen
      this.modalDescription.open(); // Öppnar modalen
    }
  }

  closeModal() {
    this.isModalOpen = false; // När modalen stängs, sätt flaggan till false
  }
}
