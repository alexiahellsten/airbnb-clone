import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4">
      <!-- Här placeras allt innehåll för startsidan -->
    </div>
  `,
  styles: []
})
export class HomeComponent {} 