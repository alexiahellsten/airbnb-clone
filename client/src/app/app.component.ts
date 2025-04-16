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
import { FooterComponent } from './components/common/footer/footer.component';
import { ModalLgComponent } from './components/common/modal-lg/modal-lg.component';
import { ModalSmComponent } from './components/common/modal-sm/modal-sm.component';
import { ListingGridComponent } from './components/common/listings/listing-grid/listing-grid.component';

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
    ListingGridComponent, // Lägg till ListingGridComponent här
    FooterComponent,
    FormsModule, // Lägg till FormsModule här för ngModel
    ModalLgComponent,
    ModalSmComponent,
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

  listings = [
    {
      images: [
        'https://placehold.co/600x400?text=1',
        'https://placehold.co/600x400?text=2',
        'https://placehold.co/600x400?text=3',
      ],
      location: 'Paris, Frankrike',
      hostType: 'Privat värd',
      date: '1–6 maj',
      price: '1200 kr',
      rating: '4,9',
    },
    {
      images: [
        'https://placehold.co/600x400?text=1',
        'https://placehold.co/600x400?text=2',
      ],
      location: 'Rom, Italien',
      hostType: 'Superhost',
      date: '10–15 maj',
      price: '980 kr',
      rating: '5,0',
    },
    {
      images: [
        'https://placehold.co/600x400?text=1',
        'https://placehold.co/600x400?text=2',
        'https://placehold.co/600x400?text=3',
      ],
      location: 'New York, USA',
      hostType: 'Privat värd',
      date: '15–20 juni',
      price: '2500 kr',
      rating: '4,8',
    },
    {
      images: [
        'https://placehold.co/600x400?text=1',
        'https://placehold.co/600x400?text=2',
      ],
      location: 'Tokyo, Japan',
      hostType: 'Superhost',
      date: '5–10 juli',
      price: '1500 kr',
      rating: '4,7',
    },
    {
      images: [
        'https://placehold.co/600x400?text=1',
        'https://placehold.co/600x400?text=2',
      ],
      location: 'Sydney, Australien',
      hostType: 'Privat värd',
      date: '25–30 juni',
      price: '1900 kr',
      rating: '4,9',
    },
  ];
}
