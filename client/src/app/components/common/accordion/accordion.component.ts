import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  standalone: true,
  template: `
    <div class="border-b border-gray-200 py-4">
      <button
        (click)="isOpen = !isOpen"
        class="flex w-full items-center justify-between text-left"
      >
        <span class="text-lg font-semibold">{{ title }}</span>
        <svg
          [class.rotate-180]="isOpen"
          class="h-5 w-5 text-gray-500 transition-transform duration-200"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div
        [class.max-h-0]="!isOpen"
        [class.max-h-[1000px]]="isOpen"
        class="overflow-hidden transition-all duration-200"
      >
        <div class="py-4 space-y-3">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AccordionComponent {
  @Input() title: string = '';
  isOpen: boolean = false;
} 