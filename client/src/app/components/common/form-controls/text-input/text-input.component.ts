import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor, OnInit {
  @Input() inputType: 'text' | 'password' | 'number' | 'email' | 'date' =
    'text';
  @Input() label: string = '';
  @Input() fullWidth: boolean = true;
  @Input() defaultValue: string = '';
  @Input() placeholderType: 'today' | 'plus7' | '' = '';
  @Input() placeholder: string = '';

  value: string = '';
  isFocused: boolean = false;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  ngOnInit() {
    if (!this.value && !this.defaultValue && this.inputType === 'date') {
      if (this.placeholderType === 'today') {
        const today = new Date();
        this.value = today.toISOString().slice(0, 10);
        this.onChange(this.value);
      } else if (this.placeholderType === 'plus7') {
        const plus7 = new Date();
        plus7.setDate(plus7.getDate() + 7);
        this.value = plus7.toISOString().slice(0, 10);
        this.onChange(this.value);
      }
    } else if (!this.value && this.defaultValue) {
      this.value = this.defaultValue;
      this.onChange(this.value);
    }
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Om du behöver hantera disabled state
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
    this.onTouched();
  }

  onInput(value: string) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  get inputClasses(): string {
    switch (this.inputType) {
      case 'text':
        return 'form-input';
      case 'password':
        return 'form-input';
      case 'number':
        return 'form-input';
      case 'email':
        return 'form-input';
      case 'date':
        return 'form-input';
      default:
        return '';
    }
  }

  openDatePicker(input: HTMLInputElement) {
    if (this.inputType === 'date') {
      input.focus();
      if ((input as any).showPicker) {
        (input as any).showPicker();
      }
    }
  }
}
