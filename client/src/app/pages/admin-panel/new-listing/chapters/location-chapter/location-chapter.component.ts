import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextInputComponent } from '../../../../../components/common/form-controls/text-input/text-input.component';

@Component({
  selector: 'app-location-chapter',
  standalone: true,
  imports: [FormsModule, TextInputComponent],
  templateUrl: './location-chapter.component.html',
  styleUrl: './location-chapter.component.css',
})
export class LocationChapterComponent {
  @Output() addressChange = new EventEmitter<string>();
  @Output() cityChange = new EventEmitter<string>();
  @Output() countryChange = new EventEmitter<string>();

  address: string = '';
  city: string = '';
  country: string = '';

  onAddressChange(value: string) {
    this.address = value;
    this.addressChange.emit(value);
  }

  onCityChange(value: string) {
    this.city = value;
    this.cityChange.emit(value);
  }

  onCountryChange(value: string) {
    this.country = value;
    this.countryChange.emit(value);
  }
}
