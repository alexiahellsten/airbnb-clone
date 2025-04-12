import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/common/button/button.component';
import { TextInputComponent } from './components/common/form-controls/text-input/text-input.component';
import { SelectBoxComponent } from './components/common/form-controls/select-box/select-box.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './components/common/modal/modal.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonComponent,
    TextInputComponent,
    SelectBoxComponent,
    FormsModule,
    ModalComponent,
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

  @ViewChild('modal') modal!: ModalComponent;

  constructor(private http: HttpClient) {
    this.http.get('/api/listings').subscribe((listings) => {
      console.log(listings);
    });
  }
  openModal() {
    this.modal.open();
  }
}
