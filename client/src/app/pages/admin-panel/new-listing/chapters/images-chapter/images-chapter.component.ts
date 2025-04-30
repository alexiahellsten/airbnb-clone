import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '../../../../../components/common/button/button.component';


@Component({
  selector: 'app-images-chapter',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule
  ],
  templateUrl: './images-chapter.component.html',
  styleUrl: './images-chapter.component.css'
})

// Komponentklass som hanterar bilduppladdning
export class ImagesChapterComponent {
  // Array som lagrar valda bildfiler
  images: File[] = [];
  maxImages = 5;

  // Sparar en referens till browserns inbyggda URL-objekt (för att skapa bildförhandsvisningar)
  URL = window.URL;

  // Metod som körs när användaren väljer filer från <input type="file">
  onFileSelected(event: Event) {
    // Konverterar event.target till en HTMLInputElement för att få tillgång till .files
    const input = event.target as HTMLInputElement;

    // Om filer finns, skicka dem vidare till handleFiles-metoden, som hanterar filerna
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  // Metod som hanterar filuppladdning och filtrering
  private handleFiles(files: FileList) {
    // Beräknar hur många fler bilder som kan laddas upp
    const remainingSlots = this.maxImages - this.images.length;

    // Väljer det minsta av tillgängliga filer och återstående platser
    const filesToAdd = Math.min(remainingSlots, files.length);

    // Går igenom varje fil som ska läggas till
    for (let i = 0; i < filesToAdd; i++) {
      const file = files[i];

      // Kontrollera att filen är en bild (t.ex. "image/png", "image/jpeg", etc.) och lägger till den i arrayen med push()
      if (file.type.startsWith('image/')) {
        this.images.push(file);
      }
    }
  }

  // Tar bort en bild från arrayen baserat på dess index
  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  //TODO: Lägg till en metod som sparar bilderna till backend med localStorage
}
