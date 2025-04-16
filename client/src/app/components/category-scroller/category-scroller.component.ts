import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService, Category } from '../../services/category.service';

@Component({
  selector: 'app-category-scroller',
  imports: [CommonModule],
  templateUrl: './category-scroller.component.html',
  styleUrl: './category-scroller.component.css'
})

export class CategoryScrollerComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Failed to load categories:', err)
    });
  }
}
