import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CapacityCounterOptionComponent } from '../../../../../components/common/form-controls/capacity-counter-option/capacity-counter-option.component';

type BedroomBeds = {
  single: number;
  double: number;
};

@Component({
  selector: 'app-capacity-chapter',
  standalone: true,
  imports: [CommonModule, FormsModule, CapacityCounterOptionComponent],
  templateUrl: './capacity-chapter.component.html',
  styleUrl: './capacity-chapter.component.css',
})
export class CapacityChapterComponent {
  @Output() maxGuestsChange = new EventEmitter<number>();
  @Output() bathroomsChange = new EventEmitter<number>();
  @Output() bedroomsChange = new EventEmitter<number>();
  @Output() bedroomDetailsChange = new EventEmitter<{ name: string; single_beds: number; double_beds: number }[]>();

  guestCount: number = 1;
  private _bedroomCount: number = 0;
  bedroomBeds: BedroomBeds[] = [];
  bathroomCount: number = 0;

  get bedroomCount(): number {
    return this._bedroomCount;
  }

  set bedroomCount(value: number) {
    this._bedroomCount = value;
    this.bedroomsChange.emit(value);

    const diff = value - this.bedroomBeds.length;

    if (diff > 0) {
      this.bedroomBeds.push(
        ...Array(diff)
          .fill(null)
          .map(() => ({ single: 0, double: 0 }))
      );
    } else if (diff < 0) {
      this.bedroomBeds.splice(value);
    }

    this.emitBedroomDetails();
  }

  onGuestCountChange(value: number) {
    this.guestCount = value;
    this.maxGuestsChange.emit(value);
  }

  onBathroomCountChange(value: number) {
    this.bathroomCount = value;
    this.bathroomsChange.emit(value);
  }

  onBedroomBedsChange() {
    this.emitBedroomDetails();
  }

  private emitBedroomDetails() {
    const bedroomDetails = this.bedroomBeds.map((bed, index) => ({
      name: `Sovrum ${index + 1}`,
      single_beds: bed.single,
      double_beds: bed.double
    }));
    this.bedroomDetailsChange.emit(bedroomDetails);
  }
}
