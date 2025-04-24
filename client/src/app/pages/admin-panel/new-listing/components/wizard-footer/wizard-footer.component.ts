import { Component } from '@angular/core';

import { LinkComponent } from '../../../../../components/common/link/link.component';
import { ButtonComponent } from '../../../../../components/common/button/button.component';
import { Link } from 'lucide-angular';

@Component({
  selector: 'app-wizard-footer',
  imports: [LinkComponent, ButtonComponent],
  templateUrl: './wizard-footer.component.html',
  styleUrl: './wizard-footer.component.css',
})
export class WizardFooterComponent {}
