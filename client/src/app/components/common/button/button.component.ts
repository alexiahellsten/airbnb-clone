import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() buttonType:
    | 'primary'
    | 'secondary'
    | 'dark'
    | 'link'
    | 'pill'
    | 'icon' = 'primary';
  @Input() destination: string = ''; // Input för destination-URL
  @Output() buttonClicked = new EventEmitter<void>(); // Output event för klick

  get buttonClasses(): string {
    switch (this.buttonType) {
      case 'primary':
        return 'bg-gradient-to-r from-[#E61E4F] to-[#D80665] text-white rounded-lg font-semibold leading-5 py-3.5 px-6 cursor-pointer';
      case 'secondary':
        return 'text-gray-950 border border-gray-950 rounded-lg font-semibold leading-5 py-3.5 px-6 cursor-pointer';
      case 'link':
        return 'text-brand-dark hover:text-black text-lg rounded-lg font-semibold py-3.5 px-6 cursor-pointer';
      case 'dark':
        return 'text-white text-lg bg-brand-dark hover:bg-[#000000] rounded-lg font-semibold py-3.5 px-6 cursor-pointer';
      case 'pill':
        return 'text-gray-950 border border-gray-400 rounded-full font-semibold leading-5 py-3.5 px-6 cursor-pointer';
      case 'icon':
        return 'text-white bg-[#FF385C] hover:bg-[#DE1163] rounded-full w-12 h-12 py-0 px-0 text-center font-semibold leading-5 cursor-pointer';
      default:
        return '';
    }
  }

  constructor(private router: Router) {}

  onClick() {
    // Navigera till destinationen när knappen klickas
    if (this.destination) {
      this.router.navigate([this.destination]);
    }

    // Emitera klick event om det behövs för andra saker
    this.buttonClicked.emit();
  }
}
