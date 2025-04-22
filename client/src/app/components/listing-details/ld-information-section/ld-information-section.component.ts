import { Component } from '@angular/core';
import { ModalLgComponent } from '../../common/modal-lg/modal-lg.component';
import { LinkComponent } from '../../common/link/link.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ld-information-section',
  imports: [LinkComponent, ModalLgComponent, RouterLink],
  templateUrl: './ld-information-section.component.html',
  styleUrl: './ld-information-section.component.css',
})
export class LdInformationSectionComponent {

}
