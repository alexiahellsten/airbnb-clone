import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle-card-lg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-card-lg.component.html',
  styleUrl: './toggle-card-lg.component.css',
})
export class ToggleCardLgComponent {
  @Input() isSelected = false;
  @Input() icon: string = ''; // Skapar möjlighet att sätta en ikon i kortet
  @Input() title: string = ''; // Skapar möjlighet att sätta en titel i kortet
  @Input() description: string = ''; // Skapar möjlighet att sätta en beskrivning i kortet
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
