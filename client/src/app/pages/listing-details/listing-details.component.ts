import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; //För att tillåta HTML i strängar

//Components
import { LdAmenitiesSectionComponent } from '../../components/listing-details/ld-amenities-section/ld-amenities-section.component';
import { LdBedroomSectionComponent } from '../../components/listing-details/ld-bedroom-section/ld-bedroom-section.component';
import { LdDescriptionSectionComponent } from '../../components/listing-details/ld-description-section/ld-description-section.component';

@Component({
  selector: 'app-listing-details',
  imports: [
    CommonModule,
    LdAmenitiesSectionComponent,
    LdBedroomSectionComponent,
    LdDescriptionSectionComponent,
  ],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.css',
})
export class ListingDetailsComponent {
  description: string =
    'Unna dig en unik vistelse i vårt trädhus mitt i Skånes vackra landskap. Njut av 180-graders panoramavy genom golv-till-tak glasfönster. Perfekt för stillhet och avkoppling, boendet passar enskilda gäster eller par. Inkluderar fina teer, kaffe och två timmars privat användning av vårt spabad. En oförglömlig känsla att sova här, passa på att besöka denna meditativa och lyxiga upplevelse uppe bland trädkronorna. Glamping på nästa nivå!<br><br> <strong>Boendet</strong><br> Sov i lyxiga bambulakan högt upp i trädkronorna med en 180-graders panoramavy genom golv-till-tak glasfönster, hållen av trädkojan med omtänksamt eleganta detaljer för att göra din vistelse mindful. Ligg i hängmattan medan ljusstrålarna bryter igenom löven på de gamla ekarna runt omkring och fylls av frid från att se de ultra-avslappnade kohjordarna som går förbi på fälten... låt dig svepas med i fridfullhet och harmoni.<br><br> Trädhuset är en underbar upplevelse för en eller två vuxna, och erbjuder en lugnande avskild plats uppe bland träden. Här finns allt ni behöver för att njuta av stillheten med ett urval av fina teer och kaffe. Trädhuset har ett litet pentry med vattenkokare och kyl men fullutrustat kök ingår inte, ni kommer att få en lista med rekommenderade restauranger i närheten, som alla ligger ungefär 15-20 minuters bilfärd bort. En liten butik och en busshållplats finns även cirka 2200 meter från trädhuset.<br><br> Trädhuset ligger två kilometer från motorvägen mitt i Skåne, vilket gör det lättillgängligt och till en perfekt utgångspunkt för att utforska det omgivande vackra landskapet.<br><br> Priset inkluderar två timmars privat användning av vårt spabad, med storslagen utsikt över landskapet och stjärnhimlen. Toalett och dusch finns tillgängliga i vårt bostadshus.<br><br> Besök oss med en vän eller kanske en romantisk afton med en partner för att fördjupa er relation och dela en unik och upplevelse tillsammans.<br><br> <strong>Gästers tillgång</strong><br> Trädhuset är avskilt beläget i en skogsdunge, bara 50 meter längs en mysig stig från bostadshuset. Som gäster har ni tillgång till toalett och dusch i bostadshuset, men de övriga delarna av huset står inte till ert förfogande. Köket och andra gemensamma ytor i bostadshuset ingår inte i ert boende i trädhuset.<br><br> Ni har även tillgång till spabadet vid bostadshuset under två timmar under er vistelse. Vänligen meddela oss vilka tider ni önskar använda det.<br><br> <strong>Under din vistelse</strong><br> Jag bor själv i en husvagn på andra sidan om bostadshuset. Ibland är jag på plats och ibland är jag iväg. När jag inte är här kan ni låsa upp trädhuset med en kod. Trädhuset självt är placerat så att det är insynsskyddat med träd mellan det och huvudhuset.';

  // Sanerad version av beskrivningen
  safeDescription: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    // Sanera HTML-strängen
    this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(
      this.description
    );
  }
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
