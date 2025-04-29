import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../components/common/button/button.component';
import { LinkComponent } from '../../components/common/link/link.component';
import { TextInputComponent } from '../../components/common/form-controls/text-input/text-input.component';
import { SelectBoxComponent } from '../../components/common/form-controls/select-box/select-box.component';
import { SelectBoxCounterOptionComponent } from '../../components/common/form-controls/select-box-counter-option/select-box-counter-option.component';
import { CounterOptionComponent } from '../../components/common/form-controls/select-box-counter-option/counter-option/counter-option.component';
import { FilterPillComponent } from '../../components/common/form-controls/filter-pill/filter-pill.component';
import { TabBarComponent } from '../../components/common/tab-bar/tab-bar.component';
import { CheckboxComponent } from '../../components/common/form-controls/checkbox/checkbox.component';
import { ListingBadgeComponent } from '../../components/common/listings/listing-badge/listing-badge.component';
import { ModalLgComponent } from '../../components/common/modal-lg/modal-lg.component';
import { ModalSmComponent } from '../../components/common/modal-sm/modal-sm.component';

@Component({
  selector: 'app-component-library',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    LinkComponent,
    TextInputComponent,
    SelectBoxComponent,
    SelectBoxCounterOptionComponent,
    CounterOptionComponent,
    FilterPillComponent,
    TabBarComponent,
    CheckboxComponent,
    ListingBadgeComponent,
    ModalLgComponent,
    ModalSmComponent,
  ],
  templateUrl: './component-library.component.html',
})
export class ComponentLibraryComponent {
  name: string = '';

  @ViewChild('modalLg') modalLg!: ModalLgComponent;
  @ViewChild('modalSm') modalSm!: ModalSmComponent;

  openLargeModal() {
    this.modalLg.open();
  }

  openSmallModal() {
    this.modalSm.open();
  }
}
