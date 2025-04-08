import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
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
