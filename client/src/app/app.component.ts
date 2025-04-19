import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { CategoryScrollerComponent } from './components/category-scroller/category-scroller.component';
import { ModalLgComponent } from './components/common/modal-lg/modal-lg.component';
//import { ButtonComponent } from './components/common/button/button.component';
import { CounterOptionComponent } from './components/common/form-controls/select-box/counter-option/counter-option.component';
import { TabBarComponent } from './components/common/tab-bar/tab-bar.component';
import { DatabaseService, Amenity } from './services/database.service';
import { FilterPillComponent } from './components/common/form-controls/filter-pill/filter-pill.component';
import { AccordionComponent } from './components/common/accordion/accordion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CategoryScrollerComponent,
    ModalLgComponent,
   // ButtonComponent,
    CounterOptionComponent,
    TabBarComponent,
    FilterPillComponent,
    AccordionComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';

  @ViewChild('filterModal') filterModal!: ModalLgComponent;

  // Prisintervall
  priceRange: number = 2500;
  minPrice: number = 100;
  maxPrice: number = 3800;
  priceStep: number = 100; 

  // Rum och sängar
  rooms: number = 1;
  beds: number = 1;
  bathrooms: number = 1;

  // Alternativ för rum och sängar
  readonly Alla = 'Alla';

  // Bekvämligheter
  amenities: Amenity[] = [];
  selectedAmenities: Set<string> = new Set();

  // Fastighetstyper
  propertyTypes = [
    { id: 'house', name: 'Hus', selected: false },
    { id: 'apartment', name: 'Lägenhet', selected: false },
    { id: 'cabin', name: 'Stuga', selected: false },
    { id: 'villa', name: 'Villa', selected: false },
    { id: 'cottage', name: 'Sommarstuga', selected: false }
  ];
  selectedProperties: Set<string> = new Set();

  // Tillgänglighet
  accessibilityFeatures = [
    { id: 'wheelchair', name: 'Rullstolsanpassat', selected: false },
    { id: 'elevator', name: 'Hiss', selected: false },
    { id: 'high_bed', name: 'Höjd säng', selected: false },
    { id: 'high_toilet', name: 'Höjd toalett', selected: false },
    { id: 'step_free', name: 'Stegfritt', selected: false }
  ];
  selectedAccessibility: Set<string> = new Set();

  // Värdspråk
  hostLanguages = [
    { id: 'svenska', name: 'Svenska', selected: false },
    { id: 'english', name: 'English', selected: false },
    { id: 'espanol', name: 'Español', selected: false },
    { id: 'francais', name: 'Français', selected: false },
    { id: 'deutsch', name: 'Deutsch', selected: false }
  ];
  selectedLanguages: Set<string> = new Set();

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.loadAmenities();
  }

  loadAmenities() {
    this.databaseService.getAmenities().subscribe(
      (amenities) => {
        this.amenities = amenities.map(amenity => ({
          ...amenity,
          selected: amenity.selected ?? false
        }));
      },
      (error) => {
        console.error('Error loading amenities:', error);
      }
    );
  }

  toggleAmenity(amenityId: string) {
    const amenity = this.amenities.find(a => a.id === amenityId);
    if (amenity) {
      amenity.selected = !amenity.selected;
      if (amenity.selected) {
        this.selectedAmenities.add(amenityId);
      } else {
        this.selectedAmenities.delete(amenityId);
      }
    }
  }

  isAmenitySelected(amenityId: string): boolean {
    return this.selectedAmenities.has(amenityId);
  }

  // Toggle methods
  toggleProperty(id: string) {
    const property = this.propertyTypes.find(p => p.id === id);
    if (property) {
      property.selected = !property.selected;
      if (property.selected) {
        this.selectedProperties.add(id);
      } else {
        this.selectedProperties.delete(id);
      }
    }
  }

  toggleAccessibility(id: string) {
    const feature = this.accessibilityFeatures.find(f => f.id === id);
    if (feature) {
      feature.selected = !feature.selected;
      if (feature.selected) {
        this.selectedAccessibility.add(id);
      } else {
        this.selectedAccessibility.delete(id);
      }
    }
  }

  toggleLanguage(id: string) {
    const language = this.hostLanguages.find(l => l.id === id);
    if (language) {
      language.selected = !language.selected;
      if (language.selected) {
        this.selectedLanguages.add(id);
      } else {
        this.selectedLanguages.delete(id);
      }
    }
  }

  // Selectmetoder
  isPropertySelected(id: string): boolean {
    return this.selectedProperties.has(id);
  }

  isAccessibilitySelected(id: string): boolean {
    return this.selectedAccessibility.has(id);
  }

  // Bokningsalternativ
  bookingOptions = [
    { label: 'Boka direkt', selected: false },
    { label: 'Själv-incheckning', selected: false },
    { label: 'Tillåter husdjur', selected: false }
  ];

  // Unika möjligheter
  uniqueOptions = [
    { label: 'Tillgång till pool', selected: false },
    { label: 'Frukost ingår', selected: false }
  ];

  // Hantera checkbox-förändringar
  onCheckboxChange(option: string, category: string) {
    switch (category) {
      case 'amenities':
        this.toggleAmenity(option);
        break;
      case 'accessibility':
        this.toggleAccessibility(option);
        break;
    }
  }

  // Hantering av knappval
  onButtonSelect(option: any, category: string) {
    if (category === 'booking') {
      option.selected = !option.selected;
    } else if (category === 'unique') {
      option.selected = !option.selected;
    }
  }

  // Rensa filter
  clearFilters() {
    this.priceRange = 2500;
    this.selectedAmenities.clear();
    this.selectedAccessibility.clear();
    
    // Rensa fastighetsval
    this.propertyTypes.forEach(p => p.selected = false);
    this.selectedProperties.clear();
    
    // Rensa tillgänglighetsval
    this.accessibilityFeatures.forEach(f => f.selected = false);
    this.selectedAccessibility.clear();
    
    // Rensa val av bokningar & unika möjligheter
    this.bookingOptions.forEach(opt => opt.selected = false);
    this.uniqueOptions.forEach(opt => opt.selected = false);
  }

  openFilterModal() {
    this.filterModal.open();
  }

  // Hantera förändring av prisintervall
  onPriceRangeChange() {
    if (this.minPrice > this.maxPrice) {
      this.minPrice = this.maxPrice;
    }
    this.priceRange = this.maxPrice;
  }

  // Hantera ändringar av slidern
  onSliderChange() {
    // Uppdaterar maxpris vid ändring av slider
    this.maxPrice = this.priceRange;
  }

  // Hantera ändringar av input (min)
  onMinPriceChange() {
    if (this.minPrice > this.maxPrice) {
      this.minPrice = this.maxPrice;
    }
    if (this.priceRange < this.minPrice) {
      this.priceRange = this.minPrice;
    }
  }

  // Hantera ändringar av input (max)
  onMaxPriceChange() {
    if (this.maxPrice < this.minPrice) {
      this.maxPrice = this.minPrice;
    }
    this.priceRange = this.maxPrice;
  }

  // Höjer priset steg för steg
  increasePrice() {
    if (this.priceRange < 5000) {
      this.priceRange = Math.min(this.priceRange + this.priceStep, 5000);
      this.maxPrice = this.priceRange;
    }
  }

  // Minskar priset steg för steg
  decreasePrice() {
    if (this.priceRange > this.minPrice) {
      this.priceRange = Math.max(this.priceRange - this.priceStep, this.minPrice);
      this.maxPrice = this.priceRange;
    }
  }

  // Metoder för rum & sängar
  increaseRooms() {
    this.rooms = Math.min(this.rooms + 1, 10);
  }

  decreaseRooms() {
    this.rooms = Math.max(this.rooms - 1, 1);
  }

  increaseBeds() {
    this.beds = Math.min(this.beds + 1, 10);
  }

  decreaseBeds() {
    this.beds = Math.max(this.beds - 1, 1);
  }

  increaseBathrooms() {
    this.bathrooms = Math.min(this.bathrooms + 1, 10);
  }

  decreaseBathrooms() {
    this.bathrooms = Math.max(this.bathrooms - 1, 1);
  }
}
