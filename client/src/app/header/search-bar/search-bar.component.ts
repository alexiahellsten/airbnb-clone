import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/common/button/button.component';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ButtonComponent, FormsModule, LucideAngularModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})

export class SearchBarComponent {
  readonly Search = Search;

  destination: string = '';
  checkIn: string = '';
  checkOut: string = '';
  guests: number = 1;

  search() {
    console.log('Sökparametrar:', {
      destination: this.destination,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      guests: this.guests,
    });

  }
}
