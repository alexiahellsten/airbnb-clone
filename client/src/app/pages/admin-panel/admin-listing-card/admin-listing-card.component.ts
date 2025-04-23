import { Component, Input } from '@angular/core';
import { Listing } from '../../../services/database.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-listing-card',
  imports: [NgIf],
  templateUrl: './admin-listing-card.component.html',
  styleUrl: './admin-listing-card.component.css'
})
export class AdminListingCardComponent {
  @Input() listing!: Listing;
}
