import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-modal-lg',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideAngularModule],
  templateUrl: './modal-lg.component.html',
  styleUrls: ['./modal-lg.component.css'],
})
export class ModalLgComponent {
  readonly X = X;

  @Input() heading: string = '';
  @Input() subheading: string = '';
  @Input() description: string = '';

  @Input() section1Title: string = '';
  @Input() section1Description: string = '';

  @Input() section2Title: string = '';
  @Input() section2Description: string = '';

  @Input() section3Title: string = '';
  @Input() section3Description: string = '';

  @Input() section4Title: string = '';
  @Input() section4Description: string = '';

  @Input() section5Title: string = '';
  @Input() section5Description: string = '';

  @Input() section6Title: string = '';
  @Input() section6Description: string = '';

  @Input() section7Title: string = '';
  @Input() section7Description: string = '';

  @Input() section8Title: string = '';
  @Input() section8Description: string = '';

  @Input() section9Title: string = '';
  @Input() section9Description: string = '';

  // Ny input för bekvämligheterna i modalen
  @Input() amenities: { icon: string; text: string }[] = [];

  @Input() primaryButtonText: string = '';
  @Input() secondaryButtonText: string = '';

  @Input() divider: boolean = true;
  @Input() shadow: boolean = true;

  isOpen: boolean = false;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
