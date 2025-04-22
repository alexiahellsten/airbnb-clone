import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-pill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-pill.component.html'
})
export class FilterPillComponent {
  @Input() isSelected = false;
  @Output() isSelectedChange = new EventEmitter<boolean>();

  toggleSelection() {
    this.isSelected = !this.isSelected;
    this.isSelectedChange.emit(this.isSelected);
  }
}
