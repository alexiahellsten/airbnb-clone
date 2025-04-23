import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-card.component.html',
  styleUrl: './toggle-card.component.css',
})
export class ToggleCardComponent {
  @Input() isSelected = false;
  @Input() icon: string = ''; // Skapar möjlighet att sätta en ikon i kortet
  @Input() title: string = ''; // tSkapar möjlighet att sätta en titel i kortet
  @Output() isSelectedChange = new EventEmitter<boolean>();

  toggleSelection() {
    this.isSelected = !this.isSelected;
    this.isSelectedChange.emit(this.isSelected);
  }
}
