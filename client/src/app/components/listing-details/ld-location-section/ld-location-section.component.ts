import { Component, ViewChild, Input } from '@angular/core';
import { ModalLgComponent } from '../../common/modal-lg/modal-lg.component';
import { Listing } from '../../../services/database.service';

@Component({
  selector: 'app-ld-location-section',
  standalone: true,
  imports: [ModalLgComponent],
  templateUrl: './ld-location-section.component.html',
  styleUrl: './ld-location-section.component.css'
})
export class LdLocationSectionComponent {
  @ViewChild('locationModal') locationModal!: ModalLgComponent;
  @Input() listing: Listing | null = null;

  openLocationModal() {
    this.locationModal.open();
  }
}
