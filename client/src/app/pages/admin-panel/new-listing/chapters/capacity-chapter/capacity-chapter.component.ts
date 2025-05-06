import { Component } from '@angular/core';
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
  guestCount: number = 1;
  private _bedroomCount: number = 0;
  bedroomBeds: BedroomBeds[] = [];
  bathroomCount: number = 0;

  get bedroomCount(): number {
    return this._bedroomCount;
  }

  set bedroomCount(value: number) {
    this._bedroomCount = value;

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
  }
}
