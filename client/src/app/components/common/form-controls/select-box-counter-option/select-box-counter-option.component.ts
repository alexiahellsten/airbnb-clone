import {
  Component,
  Input,
  forwardRef,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ElementRef,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';

import { CounterOptionComponent } from './counter-option/counter-option.component';

interface GuestCount {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

@Component({
  selector: 'app-select-box-counter-option',
  standalone: true,
  imports: [CommonModule, FormsModule, CounterOptionComponent],
  templateUrl: './select-box-counter-option.component.html',
  styleUrls: ['./select-box-counter-option.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectBoxCounterOptionComponent),
      multi: true,
    },
  ],
})

export class SelectBoxCounterOptionComponent
  implements ControlValueAccessor, AfterContentInit
{
  // Inputs
  @Input() label: string = '';
  @Input() placeholder: string = 'Välj ett alternativ';
  @Input() uniqueId: string = '';
  @Input() value: GuestCount = { adults: 0, children: 0, infants: 0, pets: 0 };
  @Output() valueChange = new EventEmitter<GuestCount>();

  isFocused: boolean = false;
  isOpen: boolean = false;

  onChange: (value: GuestCount) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: GuestCount): void {
    this.value = value;
  }

  registerOnChange(fn: (value: GuestCount) => void): void {
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
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  @ContentChildren(CounterOptionComponent)
  counterOptions!: QueryList<CounterOptionComponent>;

  ngAfterContentInit() {
    this.counterOptions.changes.subscribe(() => this.updateSummary());
    this.updateSummary();
  }

  get totalGuests(): number {
    return this.value.adults + this.value.children + this.value.infants;
  }

  get summary(): string {
    const total = this.totalGuests;
    return total === 1 ? '1 gäst' : `${total} gäster`;
  }

  updateSummary() {
    // Uppdatera värdet baserat på alternativen
    if (this.counterOptions) {
      const newValue: GuestCount = {
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0
      };

      this.counterOptions.forEach(option => {
        switch(option.label.toLowerCase()) {
          case 'vuxna':
            newValue.adults = option.value;
            break;
          case 'barn':
            newValue.children = option.value;
            break;
          case 'spädbarn':
            newValue.infants = option.value;
            break;
          case 'husdjur':
            newValue.pets = option.value;
            break;
        }
      });

      this.value = newValue;
      this.valueChange.emit(newValue);
      this.onChange(newValue);
    }
  }

  constructor(private _eref: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const isDropdownClicked = this._eref.nativeElement.contains(event.target);
    const isDifferentSelectBoxCounterOption =
      event.target instanceof HTMLElement &&
      event.target.closest('.select-box-counter-option')?.id !== this.uniqueId;

    if (!isDropdownClicked && isDifferentSelectBoxCounterOption) {
      if (this.isOpen) {
        this.isOpen = false;
      }
    }
  }
}
