import {
  Component,
  Input,
  forwardRef,
  HostListener,
  ElementRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-box',
  imports: [CommonModule],
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
  @Input() options: string[] = []; // Lista med alternativ för dropdownen
  @Input() uniqueId: string = ''; // Lägg till en unik identifierare för varje instans

  value: string = '';
  isFocused: boolean = false;
  isOpen: boolean = false;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || ''; // Gör så att värdet sätts korrekt
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen; // Växla mellan öppen och stängd dropdown
  }

  selectOption(option: string) {
    this.value = option;
    this.onChange(option); // Uppdatera ngModel när alternativet väljs
    this.closeDropdown();
  }

  closeDropdown() {
    this.isOpen = false; // Stäng dropdownen
  }

  constructor(private _eref: ElementRef) {}

  // Hantera klick utanför för att stänga dropdownen
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const isDropdownClicked = this._eref.nativeElement.contains(event.target);
    const isDifferentSelectBox =
      event.target instanceof HTMLElement &&
      event.target.closest('.select-box')?.id !== this.uniqueId;

    if (!isDropdownClicked && isDifferentSelectBox) {
      if (this.isOpen) {
        this.isOpen = false; // Stäng dropdown om vi klickar utanför
      }
    }
  }
}
