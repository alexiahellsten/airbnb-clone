import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '../../../../../components/common/button/button.component';
import { TextInputComponent } from '../../../../../components/common/form-controls/text-input/text-input.component';

@Component({
  selector: 'app-images-chapter',
  standalone: true,
  imports: [ButtonComponent, CommonModule, TextInputComponent],
  templateUrl: './images-chapter.component.html',
  styleUrl: './images-chapter.component.css',
})

// Komponentklass som hanterar bilduppladdning
export class ImagesChapterComponent {}
