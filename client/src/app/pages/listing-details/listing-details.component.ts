import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { LdAmenitiesSectionComponent } from '../../components/listing-details/ld-amenities-section/ld-amenities-section.component';
import { LdBedroomSectionComponent } from '../../components/listing-details/ld-bedroom-section/ld-bedroom-section.component';
import { FooterComponent } from '../../components/common/footer/footer.component';

@Component({
  selector: 'app-listing-details',
  imports: [
    CommonModule,
    LdAmenitiesSectionComponent,
    LdBedroomSectionComponent,
    FooterComponent,
  ],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.css',
})
export class ListingDetailsComponent {
  amenities = [
    { icon: 'bi bi-house-door', text: 'Utsikt mot gården' },
    { icon: 'bi bi-house', text: 'Utsikt mot havet' },
    { icon: 'bi bi-window', text: 'Balkong' },
    { icon: 'bi bi-wifi', text: 'Gratis WiFi' },
    { icon: 'bi bi-cloud-sun', text: 'Luftkonditionering' },
    { icon: 'bi bi-house-door', text: 'Kök' },
    { icon: 'bi bi-tv', text: 'TV' },
    { icon: 'bi bi-cup', text: 'Kaffe- och tekokare' },
    { icon: 'bi bi-umbrella', text: 'Solstolar' },
    { icon: 'bi bi-snow', text: 'Uppvärmning' },
    { icon: 'bi bi-bag', text: 'Garderob' },
    { icon: 'bi bi-water', text: 'Heta duschar' },
    { icon: 'bi bi-battery-charging', text: 'Laddningsstationer' },
    { icon: 'bi bi-laptop', text: 'Skrivbord' },
    { icon: 'bi bi-thermometer-half', text: 'Temperaturkontroll' },
    { icon: 'bi bi-lightbulb', text: 'Belysning med dimmer' },
    { icon: 'bi bi-door-closed', text: 'Ljudisolerade fönster' },
    { icon: 'bi bi-suitcase', text: 'Bagageförvaring' },
    {
      icon: 'bi bi-calendar-check',
      text: 'Flexibla in- och utcheckningstider',
    },
    { icon: 'bi bi-star', text: '5-stjärnig komfort' },
    { icon: 'bi bi-wrench', text: 'Underhållning' },
    { icon: 'bi bi-snow', text: 'Kylsystem' },
    { icon: 'bi bi-key', text: '24-timmars säkerhet' },
    { icon: 'bi bi-bicycle', text: 'Cyklar tillgängliga' },
    { icon: 'bi bi-hand-thumbs-up', text: 'Högkvalitativa sängkläder' },
    { icon: 'bi bi-envelope', text: 'Postleverans' },
    { icon: 'bi bi-cup', text: 'Gratis frukost' },
    { icon: 'bi bi-sun', text: 'Solig terrass' },
    { icon: 'bi bi-person-lines-fill', text: 'Personlig service' },
    { icon: 'bi bi-paint-bucket', text: 'Målat med allergivänliga färger' },
    { icon: 'bi bi-coin', text: 'Gratis parkering' },
    { icon: 'bi bi-lightbulb', text: 'Energisnål belysning' },
    { icon: 'bi bi-gift', text: 'Välkomstgåvor' },
    { icon: 'bi bi-check2-circle', text: 'Rökfritt' },
    { icon: 'bi bi-gear', text: 'Teknisk utrustning för affärsmöten' },
    { icon: 'bi bi-music-note', text: 'Musikanläggning' },
    { icon: 'bi bi-cash', text: 'Kontantlös betalning' },
    { icon: 'bi bi-cart-check', text: 'Hemleverans av mat' },
    { icon: 'bi bi-lock', text: 'Privat säkerhet' },
    { icon: 'bi bi-trophy', text: 'Vinnande design' },
    { icon: 'bi bi-cloud-upload', text: 'Gratis molnlagring' },
    { icon: 'bi bi-calendar', text: 'Lokala evenemangskalender' },
    { icon: 'bi bi-shield-lock', text: 'Personlig säkerhet' },
    { icon: 'bi bi-wallet', text: 'Digital plånbok' },
    { icon: 'bi bi-broadcast', text: 'Trådlös ljudsystem' },
    { icon: 'bi bi-pencil-square', text: 'Utskriftsservice' },
    { icon: 'bi bi-camera', text: 'Fotografier av boendet' },
    { icon: 'bi bi-shop', text: 'Butik på plats' },
    { icon: 'bi bi-door-open', text: 'Ingång till trädgård' },
    { icon: 'bi bi-phone', text: 'Direkttelefonkontakt' },
    { icon: 'bi bi-headset', text: 'Personlig kundservice' },
    { icon: 'bi bi-camera-video', text: 'Videokonferensmöjligheter' },
    { icon: 'bi bi-hdd', text: 'Hårddisklagring' },
  ];
}
