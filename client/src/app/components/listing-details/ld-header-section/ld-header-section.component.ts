import { Component, Input } from '@angular/core';
import { ListingImage } from '../../../services/database.service';
import { ImageGallerySliderComponent } from '../../common/listings/image-gallery-slider/image-gallery-slider.component';
import { LinkComponent } from '../../common/link/link.component';


@Component({
  selector: 'app-ld-header-section',
  imports: [
    ImageGallerySliderComponent,
    LinkComponent,
  ],
  templateUrl: './ld-header-section.component.html',
  styleUrl: './ld-header-section.component.css'
})

export class LdHeaderSectionComponent {
  @Input() headerData: any;
  @Input() images: ListingImage[] = [];
}
