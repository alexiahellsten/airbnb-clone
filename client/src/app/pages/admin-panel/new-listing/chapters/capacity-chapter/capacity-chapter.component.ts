import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CapacityCounterOptionComponent } from '../../../../../components/common/form-controls/capacity-counter-option/capacity-counter-option.component';

@Component({
  selector: 'app-capacity-chapter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CapacityCounterOptionComponent
  ],
  templateUrl: './capacity-chapter.component.html',
  styleUrl: './capacity-chapter.component.css'
})

export class CapacityChapterComponent {
  guestCount: number = 1;
  bedroomCount: number = 0;
  bedCount: number = 0;
  bathroomCount: number = 0;
}
