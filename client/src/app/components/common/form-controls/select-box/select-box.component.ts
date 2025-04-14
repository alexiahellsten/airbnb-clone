import {
  Component,
  Input,
  forwardRef,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';
import { CounterOptionComponent } from './counter-option/counter-option.component';

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
export class SelectBoxComponent
  implements ControlValueAccessor, AfterContentInit
{
  @Input() label: string = '';
  @Input() placeholder: string = 'Select an option';
  @Input() uniqueId: string = ''; // Lägg till en unik identifierare för varje instans

  value: string = '';
  isFocused: boolean = false;
  isOpen: boolean = false; // Stänger dropdownen vid initialisering

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

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen; // Växlar mellan öppet och stängt läge
  }

  closeDropdown() {
    this.isOpen = false; // Stänger dropdownen
  }

  @ContentChildren(CounterOptionComponent)
  counterOptions!: QueryList<CounterOptionComponent>;

  ngAfterContentInit() {
    this.counterOptions.changes.subscribe(() => this.updateSummary());
    this.updateSummary();
  }

  get totalGuests(): number {
    if (!this.counterOptions) return 0;
    return this.counterOptions
      .toArray()
      .reduce((sum, option) => sum + option.value, 0);
  }

  get summary(): string {
    const total = this.totalGuests;
    return total === 1 ? '1 gäst' : `${total} gäster`;
  }

  updateSummary() {
    // Trigger change detection om du behöver det i framtiden
  }

  constructor(private _eref: ElementRef) {}

  // Filtrera på en unik identifierare för att undvika krock med andra komponenter
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    // Kollar om klicket är utanför den aktuella select-boxen med hjälp av den unika id:n
    const isDropdownClicked = this._eref.nativeElement.contains(event.target);
    const isDifferentSelectBox =
      event.target instanceof HTMLElement &&
      event.target.closest('.select-box')?.id !== this.uniqueId;

    if (!isDropdownClicked && isDifferentSelectBox) {
      // Om dropdownen är öppen, stäng den
      if (this.isOpen) {
        this.isOpen = false;
      }
    }
  }
}
