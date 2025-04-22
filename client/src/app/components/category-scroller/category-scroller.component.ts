import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService, Category } from '../../services/database.service';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-scroller',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    RouterLink
  ],
  templateUrl: './category-scroller.component.html',
  styleUrl: './category-scroller.component.css'
})
export class CategoryScrollerComponent implements OnInit, AfterViewInit {
  categories: Category[] = [];

  // Används för att highlighta den kategori som valts
  selectedCategory: string | null = null;

  canScrollLeft = false;
  canScrollRight = true; // Initialize as true to show right button initially

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        // Check scroll buttons after categories are loaded and rendered
        setTimeout(() => this.checkScrollButtons(), 300);
      },
      error: (err) => console.error('Misslyckades med att hämta kategorier:', err)
    });
  }

  ngAfterViewInit(): void {
    // Initial check might be too early, so we delay it
    setTimeout(() => this.checkScrollButtons(), 300);
    
    // Add resize listener to handle responsive layout changes
    window.addEventListener('resize', () => {
      this.checkScrollButtons();
    });
  }

  // Håller koll på vilken kategori som är aktiv för att styla den
  // Anropas när användaren klickt på en kategori
  selectCategory(categoryName: string): void {
    this.selectedCategory = categoryName;
    // Här kan vi lägga in filtreringslogik
  }

  scrollLeft(): void {
    console.log("Scrolling left");
    if (this.scrollContainer) {
      const container = this.scrollContainer.nativeElement;
      // Use a smaller scroll distance on smaller screens
      const scrollDistance = window.innerWidth < 768 ? 150 : 200;
      container.scrollLeft -= scrollDistance;
      // Force check after scrolling
      setTimeout(() => this.checkScrollButtons(), 100);
    }
  }

  scrollRight(): void {
    console.log("Scrolling right");
    if (this.scrollContainer) {
      const container = this.scrollContainer.nativeElement;
      // Use a smaller scroll distance on smaller screens
      const scrollDistance = window.innerWidth < 768 ? 150 : 200;
      container.scrollLeft += scrollDistance;
      // Force check after scrolling
      setTimeout(() => this.checkScrollButtons(), 100);
    }
  }

  onScroll(): void {
    this.checkScrollButtons();
  }

  private checkScrollButtons(): void {
    if (this.scrollContainer) {
      const container = this.scrollContainer.nativeElement;
      
      // Check if scroll is available
      const hasScrollWidth = container.scrollWidth > container.clientWidth;
      
      // Check if scrolled to the left edge
      this.canScrollLeft = container.scrollLeft > 10;
      
      // Check if scrolled to the right edge
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      this.canScrollRight = hasScrollWidth && container.scrollLeft < maxScrollLeft - 10;
      
      console.log({
        scrollWidth: container.scrollWidth,
        clientWidth: container.clientWidth,
        scrollLeft: container.scrollLeft,
        maxScrollLeft: maxScrollLeft,
        canScrollLeft: this.canScrollLeft,
        canScrollRight: this.canScrollRight
      });
    }
  }
}