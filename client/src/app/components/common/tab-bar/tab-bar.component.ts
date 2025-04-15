import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-bar.component.html',
  styleUrl: './tab-bar.component.css',
})
export class TabBarComponent implements OnInit {
  @Input() tabs: string[] = [];

  selectedTab: string = '';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  ngOnInit() {
    console.log('Tabs:', this.tabs); // Lägg till denna rad för att se om arrayen är tom eller innehåller data
    if (this.tabs.length > 0) {
      this.selectedTab = this.tabs[0];
    }
  }
}
