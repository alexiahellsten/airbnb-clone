import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-option.component.html',
  styleUrls: ['./counter-option.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterOptionComponent),
      multi: true,
    },
  ],
})
export class CounterOptionComponent implements ControlValueAccessor {
  @Input() label: string = ''; // Här deklareras label som Input
  @Input() description: string = ''; // Här deklareras description som Input
  @Input() isOpen: boolean = false; // Här deklareras isOpen som Input
  @Input() value: number = 1; // Här används Input för att sätta value dynamiskt

  onChange: (value: number) => void = () => {};
  onTouched: () => void = () => {};

  // Funktioner för att hantera tvåvägsbindning
  increase() {
    this.value++;
    this.onChange(this.value); // Notifiera att värdet ändrats
  }

  decrease() {
    if (this.value > 0) {
      this.value--;
      this.onChange(this.value); // Notifiera att värdet ändrats
    }
  }

  writeValue(value: number): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}
