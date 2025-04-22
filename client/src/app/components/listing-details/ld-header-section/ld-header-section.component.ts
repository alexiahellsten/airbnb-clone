import { Component, Input, OnInit } from '@angular/core';
import { ListingImage, DatabaseService } from '../../../services/database.service';
import { LinkComponent } from '../../common/link/link.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ld-header-section',
  standalone: true,
  imports: [
    LinkComponent,
    CommonModule
  ],
  templateUrl: './ld-header-section.component.html',
  styleUrl: './ld-header-section.component.css'
})

//
export class LdHeaderSectionComponent implements OnInit {
  //Hämtar data från föräldrakomponenten
  @Input() headerData: any;

  //Hämtar ID för bilderna från databasen
  @Input() listing_id: number | null = null;

  //Lagrar bilderna som hämtas från databasen
  images: ListingImage[] = [];

  //Visar laddningsindikator medan data hämtas från API:et
  isLoading: boolean = true;

  error: string | null = null;

  //Styr om alla bilder ska visas eller inte
  showAllPhotos: boolean = false;

  //Injicerar database-servicen så bilderna kan hämtas från databasen
  constructor(private databaseService: DatabaseService) {}

  //Komponentens livscykelstart
  ngOnInit() {
    if (!this.listing_id) {
      this.error = 'Invalid listing ID';
      this.isLoading = false;
      return;
    }
    
    //Om ID finns, hämtas bilderna från databasen
    this.loadImages();
  }

  //Funktion för att hämta bilderna från databasen
  private loadImages() {
    this.databaseService.getListingImagesById(this.listing_id!).subscribe({

      //En del av observable-prenumerationen, används för att hämta asynkron data från databasen
      //next körs vid lyckat svar, error körs vid fel, complete körs när all data hämtats
      next: (images) => {

        //Sparar bilderna i images-arrayen
        this.images = images;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to load images. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  //Funktion för att hantera bildfel
  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://placehold.co/600x400?text=Image+Not+Found';
  }

  //Toggle-funktion för att visa alla bilder
  toggleShowAllPhotos() {
    this.showAllPhotos = !this.showAllPhotos;
  }
}
