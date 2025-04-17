import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-sm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-sm.component.html',
  styleUrls: ['./modal-sm.component.css'],
})

export class ModalSmComponent {
  isOpen = false;

  //Flagga som stoppar modalen från att stängas direkt efter öppning
  private ignoreNextClick = false;

  //Injicerar ElementRef som pekar på modalen i DOM:en
  constructor(private elementRef: ElementRef) {}

  //Öppnar modalen och förhindrar att den stängs direkt vid klick utanför rutan
  open() {
    this.isOpen = true;
    this.ignoreNextClick = true;
    setTimeout(() => (this.ignoreNextClick = false), 0);
  }

  toggle() {
    this.isOpen = !this.isOpen;

    //Förhindrar modalen från att stängas automatiskt när den öppnas vid toggle
    this.ignoreNextClick = true;
    setTimeout(() => (this.ignoreNextClick = false), 0);
  }

  // Stänger modalen
  close() {
    this.isOpen = false;
  }

  //Eventlyssnare som lyssnar efter klick utanför modalen
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (this.ignoreNextClick) return;

    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.close();
    }
  }
}
