import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleCardSmComponent } from '../../components/toggle-card-sm/toggle-card-sm.component';

@Component({
  selector: 'app-amenities-chapter',
  imports: [CommonModule, ToggleCardSmComponent],
  templateUrl: './amenities-chapter.component.html',
  styleUrl: './amenities-chapter.component.css',
})
export class AmenitiesChapterComponent {
  selectedTypes: string[] = [];
  onSelectTypes(title: string) {
    this.selectedTypes.indexOf(title);
    const index = this.selectedTypes.indexOf(title);
    if (index === -1) {
      this.selectedTypes.push(title); // Lägg till om ej finns
    } else {
      this.selectedTypes.splice(index, 1); // Ta bort om redan vald
    }
  }
  favoriteTypes = [
    { icon: 'wifi', title: 'Wifi' },
    { icon: 'tv', title: 'TV' },
    { icon: 'cup-hot', title: 'Kök' },
    { icon: 'textarea-t', title: 'Tvättmaskin' },
    { icon: 'car-front-fill', title: 'Gratis parkering inkluderad' },
    { icon: 'cash-coin', title: 'Betald parkering på tomten' },
    { icon: 'snow', title: 'Luftkonditionering' },
    { icon: 'laptop', title: 'Dedikerad arbetsyta' },
  ];

  uniqeTypes = [
    { icon: 'water', title: 'Pool' },
    { icon: 'droplet-half', title: 'Badtunna' },
    { icon: 'flower1', title: 'Uteplats' },
    { icon: 'fire', title: 'Grillplats' },
    { icon: 'sun', title: 'Matplats utomhus' },
    { icon: 'fire', title: 'Öppen eld utomhus' },
    { icon: 'dice-5', title: 'Biljardbord' },
    { icon: 'fire', title: 'Öppen spis' },
    { icon: 'music-note-beamed', title: 'Piano' },
    { icon: 'suit-heart', title: 'Träningsredskap' },
    { icon: 'water', title: 'Tillgång till sjön' },
    { icon: 'tsunami', title: 'Tillgång till strand' },
    { icon: 'snow', title: 'Nära pisten' },
    { icon: 'cloud-rain', title: 'Utedusch' },
  ];

  securityTypes = [
    { icon: 'bell-fill', title: 'Brandvarnare' },
    { icon: 'bandaid', title: 'Förbandslåda' },
    { icon: 'box2-heart', title: 'Brandsläckare' },
    { icon: 'shield-exclamation', title: 'Kolmonoxidlarm' },
  ];
}
