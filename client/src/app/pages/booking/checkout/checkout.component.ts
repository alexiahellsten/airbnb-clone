import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from '../../../components/common/button/button.component';
import { TextInputComponent } from '../../../components/common/form-controls/text-input/text-input.component';
import { SelectBoxComponent } from '../../../components/common/form-controls/select-box/select-box.component';
import { LinkComponent } from '../../../components/common/link/link.component';

@Component({
  selector: 'app-checkout',
  imports: [
    FormsModule,
    ButtonComponent,
    TextInputComponent,
    SelectBoxComponent,
    LinkComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckOutComponent {
  name: string = ''; // Om du fortfarande använder denna
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  selectedValue: string = ''; // Denna kommer hålla reda på det valda alternativet från SelectBox
}
