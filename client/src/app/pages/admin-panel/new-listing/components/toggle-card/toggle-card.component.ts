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
  @Input() title: string = ''; // Skapar möjlighet att sätta en titel i kortet
  @Input() mode: 'checkbox' | 'radio' = 'checkbox'; //Gör det möjligt att bestämma beteende för korten, checkbox eller radio

  @Output() isSelectedChange = new EventEmitter<boolean>();

  toggleSelection() {
    if (this.mode === 'checkbox') {
      this.isSelected = !this.isSelected;
      this.isSelectedChange.emit(this.isSelected);
    } else if (this.mode === 'radio' && !this.isSelected) {
      // Bara emit om inte redan vald
      this.isSelectedChange.emit(true);
    }
  }
}
