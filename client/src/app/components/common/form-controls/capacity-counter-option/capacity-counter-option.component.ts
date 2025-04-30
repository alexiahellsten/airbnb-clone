import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-capacity-counter-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './capacity-counter-option.component.html',
  styleUrls: ['./capacity-counter-option.component.css']
})

export class CapacityCounterOptionComponent {
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() min: number = 0;
  @Input() max: number = 99;
  @Input() value: number = 0;

  @Output() valueChange = new EventEmitter<number>();

  increment() {
    if (this.value < this.max) {
      this.value++;
      this.valueChange.emit(this.value);
    }
  }

  decrement() {
    if (this.value > this.min) {
      this.value--;
      this.valueChange.emit(this.value);
    }
  }
} 