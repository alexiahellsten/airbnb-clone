import { Component } from '@angular/core';
import { GlobalFooterComponent } from './footer-sections/global-footer/global-footer.component';

@Component({
  selector: 'app-footer',
  imports: [GlobalFooterComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
