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
  @Input() title: string = '';
  @Input() h2: string = '';
  @Input() paragraph: string = '';
  @Input() leftButtonText: string = '';
  @Input() rightButtonText: string = '';
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
