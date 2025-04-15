import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-pill',
  standalone: true,
  imports: [CommonModule], // 👈 lägg till detta
  templateUrl: './filter-pill.component.html',
  styleUrl: './filter-pill.component.css',
})
export class FilterPillComponent {
  isSelected = false;

  toggleSelection() {
    this.isSelected = !this.isSelected;
  }
}
