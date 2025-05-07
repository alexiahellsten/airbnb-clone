import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from '../../../../../components/common/button/button.component';
import { TextInputComponent } from '../../../../../components/common/form-controls/text-input/text-input.component';
import { DatabaseService } from '../../../../../services/database.service';

@Component({
  selector: 'app-images-chapter',
  standalone: true,
  imports: [ButtonComponent, CommonModule, FormsModule, TextInputComponent],
  templateUrl: './images-chapter.component.html',
  styleUrl: './images-chapter.component.css',
})
export class ImagesChapterComponent {
  imageUrls: string[] = ['', '', '', '', ''];

  constructor(private dbService: DatabaseService) {}

  onCreateListing(listingId: number): void {
    // Kolla om vi faktiskt har några bildlänkar
    if (this.imageUrls.every((url) => url.trim() === '')) {
      console.log('Inga bildlänkar angivna!');
      return;
    }

    this.imageUrls.forEach((url) => {
      if (url.trim() !== '') {
        // Se till att bara icke-tomma URL:er sparas
        const imageData = {
          listing_id: listingId,
          image_url: url,
        };

        // Anropa API:et för att spara bildlänken i listing_images
        this.dbService.createListingImage(imageData).subscribe(
          (response) => {
            console.log('Bild uppladdad:', response);
          },
          (error) => {
            console.error('Fel vid uppladdning av bild:', error);
          }
        );
      }
    });
  }
}
