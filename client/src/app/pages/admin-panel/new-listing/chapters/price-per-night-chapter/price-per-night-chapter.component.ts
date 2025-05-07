import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TextInputComponent } from '../../../../../components/common/form-controls/text-input/text-input.component';
import { ButtonComponent } from '../../../../../components/common/button/button.component';

@Component({
  selector: 'app-price-per-night-chapter',
  standalone: true,
  imports: [
    FormsModule,
    TextInputComponent,
    ButtonComponent
  ],
  templateUrl: './price-per-night-chapter.component.html',
  styleUrl: './price-per-night-chapter.component.css',
})
export class PricePerNightChapterComponent {
  @Output() priceChange = new EventEmitter<number>();
  price: number = 0;

  //15% bokningsavgift
  bookingFeePercentage: number = 15;

  //Metod som tar emot Event från input-fältet
  onPriceChange(event: Event) {
    //Här omvandlas event.target till en HTMLInputElement för att få tillgång till .value,
    const value = (event.target as HTMLInputElement).value;

    //Om användaren har matat in något (value finns), konverteras det till ett heltal med parseInt och lagras i this.price.
    // Om fältet är tomt, sätts price till 0.
    this.price = value ? parseInt(value) : 0;
    this.priceChange.emit(this.price);
  }

  //Get-metod som returnerar det totala priset inklusive bokningsavgift (lägger til 15% av price).
  get totalPrice(): number {
    return this.price + (this.price * (this.bookingFeePercentage / 100));
  }
}
