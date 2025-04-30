import { Component, OnInit } from '@angular/core';
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
  pricePerNight: number = 1400; // Pris per natt
  nights: number = 7; // Antal nätter
  cleaningFee: number = 1200; // Städavgift
  airbnbServiceFee: number = 1944; // Airbnb serviceavgift

  // Beräkna totaler
  totalPriceForNights: number = this.pricePerNight * this.nights;
  totalAmount: number =
    this.totalPriceForNights + this.cleaningFee + this.airbnbServiceFee;

  constructor() {}

  ngOnInit(): void {}
}
