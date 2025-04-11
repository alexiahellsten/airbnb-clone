import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-select-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectBoxComponent),
      multi: true,
    },
  ],
})
export class SelectBoxComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = 'Select an option';
  @Input() options: string[] = [];
  value: string = '';
  isFocused: boolean = false;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {

  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.value = value;
    this.onChange(value);
  }

  get selectClasses(): string {
    return 'form-select';
  }
}
