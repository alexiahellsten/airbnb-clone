import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/common/button/button.component';
import { TextInputComponent } from './components/common/form-controls/text-input/text-input.component';
import { FormsModule } from '@angular/forms'; // Lägg till denna import

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonComponent, TextInputComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'airbnb';

  // Deklarera variabler för ngModel
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {
    this.http.get('/api/listings').subscribe((listings) => {
      console.log(listings);
    });
  }
}
