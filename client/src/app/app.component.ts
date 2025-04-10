import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/common/button/button.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//Representerar applikationen (överst i komponent-hierarkin)
export class AppComponent {
  title = 'airbnb';

  //Konstruktor som tar in en httpclient som används för att göra anrop till backend
  constructor(private http: HttpClient) {
    this.http.get("/api/listings").subscribe(listings => {
      console.log(listings);
    });
  }
}
