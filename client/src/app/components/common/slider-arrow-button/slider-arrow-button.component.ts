import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider-arrow-button',
  imports: [CommonModule],
  templateUrl: './slider-arrow-button.component.html',
  styleUrl: './slider-arrow-button.component.css',
})
export class SliderArrowButtonComponent {
  @Input() direction: 'left' | 'right' = 'left';
}
