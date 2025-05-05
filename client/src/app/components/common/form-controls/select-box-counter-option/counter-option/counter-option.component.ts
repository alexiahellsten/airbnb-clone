import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
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
  
  private _value: number = 0;
  @Input() set value(val: number) {
    this._value = val;
    this.onChange(this._value);
  }
  get value(): number {
    return this._value;
  }

  onChange: (value: number) => void = () => {};
  onTouched: () => void = () => {};

  // Funktioner för att hantera tvåvägsbindning
  increase() {
    this._value++;
    this.onChange(this._value); // Notifiera att värdet ändrats
  }

  decrease() {
    if (this._value > 0) {
      this._value--;
      this.onChange(this._value); // Notifiera att värdet ändrats
    }
  }

  writeValue(value: number): void {
    if (value !== undefined) {
      this._value = value;
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
