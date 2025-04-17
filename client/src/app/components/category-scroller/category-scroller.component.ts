import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService, Category } from '../../services/database.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-category-scroller',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule
  ],
  templateUrl: './category-scroller.component.html',
  styleUrl: './category-scroller.component.css'
})
export class CategoryScrollerComponent implements OnInit, AfterViewInit {
  categories: Category[] = [];

  //Används för att highlighta den kategori som valts
  selectedCategory: string | null = null;

  canScrollLeft = false;
  canScrollRight = false;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Misslyckades med att hämta kategorier:', err)
    });
  }

  ngAfterViewInit(): void {
    this.checkScrollButtons();
  }

  //Håller koll på vilken kategori som är aktiv för att styla den
  //Anropas när användaren klickat på en kategori
  selectCategory(categoryName: string): void {
    this.selectedCategory = categoryName;
    // Här kan vi lägga in filtreringslogik
  }

  scrollLeft(): void {
    if (this.scrollContainer) {
      const container = this.scrollContainer.nativeElement;
      container.scrollLeft -= 200;
      setTimeout(() => this.checkScrollButtons(), 100);
    }
  }

  scrollRight(): void {
    if (this.scrollContainer) {
      const container = this.scrollContainer.nativeElement;
      container.scrollLeft += 200;
      setTimeout(() => this.checkScrollButtons(), 100);
    }
  }

  onScroll(): void {
    this.checkScrollButtons();
  }

  private checkScrollButtons(): void {
    if (this.scrollContainer) {
      const container = this.scrollContainer.nativeElement;
      this.canScrollLeft = container.scrollLeft > 0;
      this.canScrollRight = container.scrollLeft < (container.scrollWidth - container.clientWidth);
    }
  }
}
