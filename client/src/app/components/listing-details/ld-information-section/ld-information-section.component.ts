import { Component, ViewChild } from '@angular/core';
import { ModalLgComponent } from '../../common/modal-lg/modal-lg.component';
import { LinkComponent } from '../../common/link/link.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ld-information-section',
  standalone: true,
  imports: [LinkComponent, ModalLgComponent, RouterLink],
  templateUrl: './ld-information-section.component.html',
  styleUrl: './ld-information-section.component.css',
})
export class LdInformationSectionComponent {
  @ViewChild('houseRulesModal') houseRulesModal!: ModalLgComponent;
  @ViewChild('safetyModal') safetyModal!: ModalLgComponent;
  @ViewChild('cancellationModal') cancellationModal!: ModalLgComponent;

  openHouseRulesModal() {
    this.houseRulesModal.open();
  }

  openSafetyModal() {
    this.safetyModal.open();
  }

  openCancellationModal() {
    this.cancellationModal.open();
  }
}
