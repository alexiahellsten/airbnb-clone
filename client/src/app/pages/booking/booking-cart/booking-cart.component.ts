import { Component } from '@angular/core';

import { LinkComponent } from '../../../components/common/link/link.component';
import { ButtonComponent } from '../../../components/common/button/button.component';

@Component({
  selector: 'app-booking-cart',
  imports: [LinkComponent, ButtonComponent],
  templateUrl: './booking-cart.component.html',
  styleUrl: './booking-cart.component.css',
})
export class BookingCartComponent {}
