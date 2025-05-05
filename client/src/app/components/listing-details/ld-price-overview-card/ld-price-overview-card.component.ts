import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SelectBoxCounterOptionComponent } from '../../common/form-controls/select-box-counter-option/select-box-counter-option.component';
import { CounterOptionComponent } from '../../common/form-controls/select-box-counter-option/counter-option/counter-option.component';
import { TextInputComponent } from '../../common/form-controls/text-input/text-input.component';
import { ButtonComponent } from '../../common/button/button.component';

@Component({
  selector: 'app-ld-price-overview-card',
  imports: [
    FormsModule,
    SelectBoxCounterOptionComponent,
    CounterOptionComponent,
    TextInputComponent,
    ButtonComponent,
  ],
  templateUrl: './ld-price-overview-card.component.html',
  styleUrl: './ld-price-overview-card.component.css',
})
export class LdPriceOverviewCardComponent implements OnInit {
  // Definiera värdena
  @Input() pricePerNight: number = 0; // Pris per natt
  checkInDate: string = '';
  checkOutDate: string = '';
  cleaningFee: number = 1200; // Städavgift
  airbnbServiceFee: number = 1944; // Airbnb serviceavgift

  get nights(): number {
    if (this.checkInDate && this.checkOutDate) {
      const inDate = new Date(this.checkInDate);
      const outDate = new Date(this.checkOutDate);
      const diff = outDate.getTime() - inDate.getTime();
      return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
    }
    return 1;
  }

  get totalPriceForNights(): number {
    return this.pricePerNight * this.nights;
  }

  get totalAmount(): number {
    return this.totalPriceForNights + this.cleaningFee + this.airbnbServiceFee;
  }

  constructor() {}

  ngOnInit(): void {
    // Sätt defaultdatum
    const today = new Date();
    this.checkInDate = today.toISOString().slice(0, 10);
    const plus7 = new Date();
    plus7.setDate(today.getDate() + 7);
    this.checkOutDate = plus7.toISOString().slice(0, 10);
  }
}
