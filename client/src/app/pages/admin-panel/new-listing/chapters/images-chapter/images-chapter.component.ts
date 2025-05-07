import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '../../../../../components/common/button/button.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-images-chapter',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './images-chapter.component.html',
  styleUrl: './images-chapter.component.css',
})

// Komponentklass som hanterar bilduppladdning
export class ImagesChapterComponent {
  @Input() listingId: number = 0; // Initialisera med ett standardvärde

  // Array som lagrar valda bildfiler
  images: File[] = [];
  imageUrls: string[] = []; // Ny array för att lagra URL:er

  maxImages = 5;

  // Sparar en referens till browserns inbyggda URL-objekt (för att skapa bildförhandsvisningar)
  URL = window.URL;

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {}

  // Metod som körs när användaren väljer filer från <input type="file">
  onFileSelected(event: Event) {
    // Konverterar event.target till en HTMLInputElement för att få tillgång till .files
    const input = event.target as HTMLInputElement;

    // Om filer finns, skicka dem vidare till handleFiles-metoden, som hanterar filerna
    if (input.files) {
      this.handleFiles(input.files);
    }
    console.log('Valda filer:', this.images.length);
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
        this.imageUrls.push(this.URL.createObjectURL(file)); // Lägg till URL
      }
    }

    // Använd setTimeout för att undvika ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  // Tar bort en bild från arrayen baserat på dess index
  removeImage(index: number) {
    this.images.splice(index, 1);
    this.imageUrls.splice(index, 1); // Ta bort motsvarande URL

    // Använd setTimeout här också
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  // // Metod för att ladda upp bilder till servern
  // uploadImages(): void {
  //   const formData = new FormData();

  //   // Lägg till alla bilder i formData
  //   this.images.forEach((file) => {
  //     formData.append('images', file);
  //   });

  //   // Sätt upp en begäran till servern
  //   this.http
  //     .post('http://localhost:8000/api/images/uploads', formData)
  //     .subscribe({
  //       next: (response) => {
  //         console.log('Bilder uppladdade:', response);
  //       },
  //       error: (error) => {
  //         console.error('Fel vid uppladdning av bilder:', error);
  //       },
  //     });
  // }

  uploadImages(): void {
    const formData = new FormData();

    // Hämta images från denna komponent om de finns här
    const files = this.images;

    files.forEach((file) => formData.append('images', file));

    // Anta att listingId finns i denna komponent (annars kan du få det på annat sätt)
    const listingId = this.listingId;

    formData.append('listingId', listingId.toString());

    this.http
      .post('http://localhost:8000/api/images/uploads', formData)
      .subscribe({
        next: (response) => {
          console.log('Bilder uppladdade:', response);
        },
        error: (error) => {
          console.error('Fel vid uppladdning av bilder:', error);
        },
      });
  }
}
