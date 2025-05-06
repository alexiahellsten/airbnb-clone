import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  DatabaseService,
  Amenity,
} from '../../../../../services/database.service';

import { CommonModule } from '@angular/common';
import { ToggleCardSmComponent } from '../../components/toggle-card-sm/toggle-card-sm.component';

@Component({
  selector: 'app-amenities-chapter',
  standalone: true,
  imports: [CommonModule, ToggleCardSmComponent],
  templateUrl: './amenities-chapter.component.html',
  styleUrl: './amenities-chapter.component.css',
})
export class AmenitiesChapterComponent implements OnInit {
  @Output() selectedAmenitiesChange = new EventEmitter<string[]>();

  amenities: Amenity[] = [];
  selectedAmenities: string[] = [];
  favoriteTypes: Amenity[] = [];
  uniqeTypes: Amenity[] = [];
  securityTypes: Amenity[] = [];

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    this.getAmenities();
  }

  onToggleAmenity(name: string): void {
    const index = this.selectedAmenities.indexOf(name);
    if (index === -1) {
      this.selectedAmenities.push(name);
    } else {
      this.selectedAmenities.splice(index, 1);
    }
    this.selectedAmenitiesChange.emit(this.selectedAmenities);
  }

  getAmenities(): void {
    this.dbService.getAmenities().subscribe((amenities: Amenity[]) => {
      this.amenities = amenities;
      this.favoriteTypes = amenities.filter((a) => a.category === 'favorite');
      this.uniqeTypes = amenities.filter((a) => a.category === 'uniqe');
      this.securityTypes = amenities.filter((a) => a.category === 'security');
    });
  }
}
