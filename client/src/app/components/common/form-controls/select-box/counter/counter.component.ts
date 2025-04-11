import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  standalone: true,
  imports: [CommonModule], // Här importeras CommonModule
})
export class CounterComponent {
  value: number = 1;

  increase() {
    this.value++;
  }

  decrease() {
    if (this.value > 0) {
      this.value--;
    }
  }
}
