import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { CategoryScrollerComponent } from './components/category-scroller/category-scroller.component';
import { ModalLgComponent } from './components/common/modal-lg/modal-lg.component';
import { ButtonComponent } from './components/common/button/button.component';
import { LogoComponent } from './components/logo/logo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    CategoryScrollerComponent,
    ModalLgComponent,
    ButtonComponent,
    LogoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'client';
  
  @ViewChild('filterModal') filterModal!: ModalLgComponent;

  openFilterModal() {
    this.filterModal.open();
  }
}
