import { Component } from '@angular/core';

import { TextInputComponent } from '../../../../../components/common/form-controls/text-input/text-input.component';
import { ButtonComponent } from '../../../../../components/common/button/button.component';

@Component({
  selector: 'app-price-per-night-chapter',
  imports: [
    TextInputComponent,
    ButtonComponent
  ],
  templateUrl: './price-per-night-chapter.component.html',
  styleUrl: './price-per-night-chapter.component.css',
})
export class PricePerNightChapterComponent {

}
