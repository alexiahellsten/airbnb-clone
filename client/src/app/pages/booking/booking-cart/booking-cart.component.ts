import { Component, viewChild } from '@angular/core';
import { ViewChild } from '@angular/core';

import { LinkComponent } from '../../../components/common/link/link.component';
import { ButtonComponent } from '../../../components/common/button/button.component';
import { ModalLgComponent } from '../../../components/common/modal-lg/modal-lg.component';
import { CounterOptionComponent } from '../../../components/common/form-controls/select-box-counter-option/counter-option/counter-option.component';

@Component({
  selector: 'app-booking-cart',
  imports: [
    LinkComponent,
    ButtonComponent,
    ModalLgComponent,
    CounterOptionComponent,
  ],
  templateUrl: './booking-cart.component.html',
  styleUrl: './booking-cart.component.css',
})
export class BookingCartComponent {
  @ViewChild('guestModal') guestModal!: ModalLgComponent;
  @ViewChild('dateModal') dateModal!: ModalLgComponent;

  openGuestModal() {
    this.guestModal.open();
  }

  openDateModal() {
    this.dateModal.open();
  }
}
