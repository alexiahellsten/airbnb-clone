import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() buttonType: 'primary' | 'secondary' | 'icon' = 'primary';

  get buttonClasses(): string {
    switch (this.buttonType) {
      case 'primary':
        return 'bg-gradient-to-r from-[#E61E4F] to-[#D80665] text-white rounded-lg font-semibold leading-5 py-3.5 px-6 cursor-pointer';
      case 'secondary':
        return 'text-gray-950 border border-gray-950 rounded-lg font-semibold leading-5 py-3.5 px-6 cursor-pointer';
      case 'icon':
        return 'text-white bg-[#FF385C] hover:bg-[#DE1163] rounded-full w-12 h-12 py-0 px-0 text-center font-semibold leading-5 cursor-pointer';
      default:
        return '';
    }
  }

}
