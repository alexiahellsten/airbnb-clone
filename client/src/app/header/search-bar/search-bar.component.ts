import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/common/button/button.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ButtonComponent, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  destination: string = '';
  checkIn: string = '';
  checkOut: string = '';
  guests: number = 1;

  constructor(private router: Router) {}

  search() {
    if (this.destination.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.destination.trim() }
      });
    }
  }

  handleKeyPress(event: KeyboardEvent | Event) {
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      this.search();
    }
  }
}
