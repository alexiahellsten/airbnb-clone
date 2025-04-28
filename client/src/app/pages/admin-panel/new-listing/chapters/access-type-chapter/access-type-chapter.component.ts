import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToggleCardLgComponent } from '../../components/toggle-card-lg/toggle-card-lg.component';

@Component({
  selector: 'app-access-type-chapter',
  imports: [CommonModule, ToggleCardLgComponent],
  templateUrl: './access-type-chapter.component.html',
  styleUrl: './access-type-chapter.component.css',
})
export class AccessTypeChapterComponent {
  selectedType: string | null = null;
  onSelectType(title: string) {
    this.selectedType = title;
  }
  types = [
    {
      icon: 'house-door',
      title: 'Ett helt boende',
      description: 'Gäster har hela boendet för sig själva.',
    },
    {
      icon: 'door-open',
      title: 'Ett rum',
      description:
        'Gästerna har ett eget rum i ett boende samt tillgång till delade utrymmen.',
    },
    {
      icon: 'house-heart',
      title: 'Ett delat rum på vandrarhem',
      description:
        'Gäster sover i ett delat rum på ett professionellt administrerat vandrarhem med personal på plats dygnet runt.',
    },
  ];
}
