import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextAreaComponent } from '../../components/text-area/text-area.component';

@Component({
  selector: 'app-description-chapter',
  standalone: true,
  imports: [FormsModule, TextAreaComponent],
  templateUrl: './description-chapter.component.html',
  styleUrl: './description-chapter.component.css'
})
export class DescriptionChapterComponent {
  @Output() descriptionChange = new EventEmitter<string>();
  description: string = '';

  onDescriptionChange(value: string) {
    this.description = value;
    this.descriptionChange.emit(value);
  }
}
