import { Component, ViewChild, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ModalLgComponent } from '../../common/modal-lg/modal-lg.component';
import { LinkComponent } from '../../common/link/link.component';

@Component({
  selector: 'app-ld-description-section',
  imports: [CommonModule, ModalLgComponent, LinkComponent],
  templateUrl: './ld-description-section.component.html',
  styleUrls: ['./ld-description-section.component.css'],
})
export class LdDescriptionSectionComponent implements OnChanges {
  @Input() rawDescription!: string; // För slice / begränsad text
  @Input() description!: SafeHtml; // För säker HTML-visning
  @ViewChild('modalDescription') modalDescription!: ModalLgComponent;
  isModalOpen = false; // Flagga för att hantera om modalen är öppen

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {

  }

  openModal() {
    this.isModalOpen = true; // När modalen öppnas, sätt flaggan till true
    // Skicka hela description till modalen
    if (this.modalDescription) {
      this.modalDescription.description = this.rawDescription;
      this.modalDescription.open(); // Öppnar modalen
    }
  }

  closeModal() {
    this.isModalOpen = false; // När modalen stängs, sätt flaggan till false
  }

  // Får den första 500 tecknen för att visa som begränsad text
  get limitedDescription() {
    if (
      typeof this.rawDescription === 'string' &&
      this.rawDescription.length > 0
    ) {
      return this.rawDescription.slice(0, 500) + '...';
    }
    return '';
  }
  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
