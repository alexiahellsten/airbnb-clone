import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importera FormsModule
import { CommonModule } from '@angular/common'; // Lägg till denna import

// Komponenter
import { ButtonComponent } from './components/common/button/button.component';
import { TextInputComponent } from './components/common/form-controls/text-input/text-input.component';
import { SelectBoxComponent } from './components/common/form-controls/select-box/select-box.component';
import { CounterOptionComponent } from './components/common/form-controls/select-box/counter-option/counter-option.component'; // Importera CounterOptionComponent här

@Component({
  selector: 'app-root',
  imports: [
    CommonModule, // Lägg till CommonModule här för att få tillgång till *ngFor
    RouterOutlet,
    ButtonComponent,
    TextInputComponent,
    SelectBoxComponent,
    CounterOptionComponent, // Lägg till CounterOptionComponent här också
    FormsModule, // Lägg till FormsModule här för ngModel
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

  constructor(private http: HttpClient) {
    this.http.get('/api/listings').subscribe((listings) => {
      console.log(listings);
    });
  }
}
