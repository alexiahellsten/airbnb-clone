import { Component } from '@angular/core';
import { GlobalFooterComponent } from './footer-sections/global-footer/global-footer.component';
import { PrimaryFooterComponent } from './footer-sections/primary-footer/primary-footer.component';

@Component({
  selector: 'app-footer',
  standalone: true, // Lägg till denna rad också
  imports: [GlobalFooterComponent, PrimaryFooterComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
