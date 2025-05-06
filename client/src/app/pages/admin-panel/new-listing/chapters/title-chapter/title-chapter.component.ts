import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextAreaComponent } from '../../components/text-area/text-area.component';

@Component({
  selector: 'app-title-chapter',
  standalone: true,
  imports: [FormsModule, TextAreaComponent],
  templateUrl: './title-chapter.component.html',
  styleUrl: './title-chapter.component.css',
})
export class TitleChapterComponent {
  @Output() titleChange = new EventEmitter<string>();
  title: string = '';

  onTitleChange(value: string) {
    this.title = value;
    this.titleChange.emit(value);
  }
}
