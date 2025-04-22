import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../components/common/button/button.component';
import { SearchBarComponent } from '../header/search-bar/search-bar.component';
import { ModalSmComponent } from '../components/common/modal-sm/modal-sm.component';
import { LucideAngularModule, Menu, Globe, User } from 'lucide-angular';
import { LogoComponent } from '../header/logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    SearchBarComponent,
    ModalSmComponent,
    LucideAngularModule,
    LogoComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  readonly Menu = Menu;
  readonly Globe = Globe;
  readonly User = User;

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
