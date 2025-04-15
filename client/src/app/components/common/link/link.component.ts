import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css',
})
export class LinkComponent {
  @Input() linkType: 'default' | 'secondary' | 'icon' | 'report' = 'default';

  get linkClasses(): string {
    switch (this.linkType) {
      case 'default':
        return 'underline';
      case 'secondary':
        return 'underline font-semibold';
      case 'icon':
        return 'text-sm underline font-bold';
      case 'report':
        return 'underline text-sm font-bold text-brand-textLight';
      default:
        return '';
    }
  }
}
