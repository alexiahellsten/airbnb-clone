import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-global-footer',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './global-footer.component.html',
  styleUrl: './global-footer.component.css',
})
export class GlobalFooterComponent {}
