import { Component, viewChild } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LinkComponent } from '../../../components/common/link/link.component';
import { ButtonComponent } from '../../../components/common/button/button.component';
import { ModalLgComponent } from '../../../components/common/modal-lg/modal-lg.component';
import { CounterOptionComponent } from '../../../components/common/form-controls/select-box-counter-option/counter-option/counter-option.component';
import { TextInputComponent } from '../../../components/common/form-controls/text-input/text-input.component';

@Component({
  selector: 'app-booking-cart',
  imports: [
    FormsModule,
    LinkComponent,
    ButtonComponent,
    ModalLgComponent,
    CounterOptionComponent,
    TextInputComponent,
  ],
  templateUrl: './booking-cart.component.html',
  styleUrl: './booking-cart.component.css',
})
export class BookingCartComponent {
  @ViewChild('guestModal') guestModal!: ModalLgComponent;
  @ViewChild('dateModal') dateModal!: ModalLgComponent;

  // Datum
  checkIn: string = new Date().toISOString().slice(0, 10);
  checkOut: string = (() => {
    const plus7 = new Date();
    plus7.setDate(plus7.getDate() + 7);
    return plus7.toISOString().slice(0, 10);
  })();

  // Gäster
  adults: number = 1;
  children: number = 0;
  infants: number = 0;
  pets: number = 0;

  openGuestModal() {
    this.guestModal.open();
  }

  openDateModal() {
    this.dateModal.open();
  }

  saveDates() {
    // Här kan du lägga till logik för att spara datumen
    this.dateModal.close();
  }

  cancelDates() {
    this.dateModal.close();
  }

  saveGuests() {
    // Här kan du lägga till logik för att spara gäster
    this.guestModal.close();
  }

  cancelGuests() {
    this.guestModal.close();
  }
}
