import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/common/button/button.component';
import { TextInputComponent } from './components/common/form-controls/text-input/text-input.component';
import { SelectBoxComponent } from './components/common/form-controls/select-box/select-box.component';
import { FormsModule } from '@angular/forms';
import { ModalLgComponent } from './components/common/modal-lg/modal-lg.component';
import { ModalSmComponent } from './components/common/modal-sm/modal-sm.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterLink,
    RouterOutlet,
    ButtonComponent,
    TextInputComponent,
    SelectBoxComponent,
    FormsModule,
    ModalLgComponent, ModalSmComponent,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'airbnb';

  // Deklarera variabler för ngModel
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

