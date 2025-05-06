import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CapacityCounterOptionComponent } from '../../../../../components/common/form-controls/capacity-counter-option/capacity-counter-option.component';

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
  bedCounts: number[] = [];
  bathroomCount: number = 0;

  get bedroomCount(): number {
    return this._bedroomCount;
  }

  set bedroomCount(value: number) {
    this._bedroomCount = value;

    // Justera längden på bedCounts baserat på nya bedroomCount
    const diff = value - this.bedCounts.length;

    if (diff > 0) {
      this.bedCounts.push(...Array(diff).fill(0));
    } else if (diff < 0) {
      this.bedCounts.splice(value);
    }
  }
}
