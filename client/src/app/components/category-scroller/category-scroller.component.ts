import { Component } from '@angular/core';

@Component({
  selector: 'app-category-scroller',
  imports: [],
  templateUrl: './category-scroller.component.html',
  styleUrl: './category-scroller.component.css'
})

export class CategoryScrollerComponent {
  //Importera fejkdata tillsvidare
  categories = ['Strandnära', 'Stugor', 'Unika boenden', 'Populärt', 'Natur'];
}
