import { Component } from '@angular/core';
import { ListingCardComponent } from '../../common/listings/listing-card/listing-card.component';
import { ButtonComponent } from '../../common/button/button.component';
@Component({
  selector: 'app-ld-host-section',
  standalone: true,
  imports: [
    ListingCardComponent,
    ButtonComponent,
  ],
  templateUrl: './ld-host-section.component.html',
  styleUrl: './ld-host-section.component.css'
})
export class LdHostSectionComponent {

}
