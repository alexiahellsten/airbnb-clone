import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importera FormsModule
import { CommonModule } from '@angular/common'; // Lägg till denna import

// Komponenter
import { ButtonComponent } from './components/common/button/button.component';
import { LinkComponent } from './components/common/link/link.component';
import { TextInputComponent } from './components/common/form-controls/text-input/text-input.component';
import { SelectBoxComponent } from './components/common/form-controls/select-box/select-box.component';
import { CounterOptionComponent } from './components/common/form-controls/select-box/counter-option/counter-option.component'; // Importera CounterOptionComponent här
import { FilterPillComponent } from './components/common/form-controls/filter-pill/filter-pill.component';
import { TabBarComponent } from './components/common/tab-bar/tab-bar.component';
import { CheckboxComponent } from './components/common/form-controls/checkbox/checkbox.component'; // Importera CheckboxComponent här
import { ListingBadgeComponent } from './components/common/listings/listing-badge/listing-badge.component'; // Importera ListingBadgeComponent här
import { FooterComponent } from './components/common/footer/footer.component';
import { ModalLgComponent } from './components/common/modal-lg/modal-lg.component';
import { ModalSmComponent } from './components/common/modal-sm/modal-sm.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    ButtonComponent,
    LinkComponent,
    TextInputComponent,
    SelectBoxComponent,
    CounterOptionComponent, // Lägg till CounterOptionComponent här också
    FilterPillComponent,
    TabBarComponent,
    CheckboxComponent, // Lägg till CheckboxComponent här
    ListingBadgeComponent,
    FooterComponent,
    FormsModule, // Lägg till FormsModule här för ngModel
    ModalLgComponent,
    ModalSmComponent,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'airbnb';

  counters = [1, 2, 3]; // Exempelvärden för vuxna

  name: string = '';
  email: string = '';
  password: string = '';

  @ViewChild('modalLg') modalLg!: ModalLgComponent;
  @ViewChild('modalSm') modalSm!: ModalSmComponent;

  constructor(private http: HttpClient) {
    this.http.get('/api/listings').subscribe((listings) => {
      console.log(listings);
    });
  }
  openLargeModal() {
    this.modalLg.open();
  }

  openSmallModal() {
    this.modalSm.open();
  }
}
