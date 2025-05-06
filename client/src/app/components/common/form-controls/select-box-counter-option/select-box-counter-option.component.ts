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

// Interface för gästantal
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
  // Inputs för att konfigurera komponenten
  @Input() label: string = '';          
  @Input() placeholder: string = 'Välj ett alternativ';  
  @Input() uniqueId: string = ''; // Unikt ID för komponenten
  
  // Variabel för att lagra gästantal
  private _value: GuestCount = { adults: 0, children: 0, infants: 0, pets: 0 };
  
  // Getter och setter för value med tvåvägsbindning
  @Input() set value(val: GuestCount) {
    this._value = val;
    this.updateCounterOptions();
  }
  get value(): GuestCount {
    return this._value;
  }
  
  // Event emitter för att meddela föräldrakomponenten om värdeförändringar
  @Output() valueChange = new EventEmitter<GuestCount>();

  // Statusvariabler för UI-hantering
  isFocused: boolean = false;  
  isOpen: boolean = false;    

  // Callbacks för formulärhantering
  onChange: (value: GuestCount) => void = () => {};
  onTouched: () => void = () => {};

  // Metoder för ControlValueAccessor som implementeras från ControlValueAccessor interface
  writeValue(value: GuestCount): void {
    if (value) {
      this._value = value;
      this.updateCounterOptions();
    }
  }

  // Metod för att registrera en funktion som ska anropas när värdet ändras
  registerOnChange(fn: (value: GuestCount) => void): void {
    this.onChange = fn;
  }

  // Metod för att registrera en funktion som ska anropas när värdet ändras
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // UI-hanteringsmetoder
  onFocus(): void {
    this.isFocused = true;
  }

  // Metod för att hantera när fokus förloras
  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
  }

  // Metod för att växla dropdown-menyn
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  // Metod för att stänga dropdown-menyn
  closeDropdown() {
    this.isOpen = false;
  }

  // Referens till alla counter-option komponenter
  @ContentChildren(CounterOptionComponent)
  counterOptions!: QueryList<CounterOptionComponent>;

  // Livscykelmetod som körs efter att innehållet initierats
  ngAfterContentInit() {
    this.counterOptions.changes.subscribe(() => {
      this.setupCounterOptions();
    });
    this.setupCounterOptions();
  }

  // Privat metod för att konfigurera counter-options
  private setupCounterOptions() {
    if (this.counterOptions) {
      this.counterOptions.forEach(option => {
        // Sätt initiala värden baserat på option-typ
        switch(option.label.toLowerCase()) {
          case 'vuxna':
            option.value = this._value.adults;
            break;
          case 'barn':
            option.value = this._value.children;
            break;
          case 'spädbarn':
            option.value = this._value.infants;
            break;
          case 'husdjur':
            option.value = this._value.pets;
            break;
        }

        // Prenumerera på värdeförändringar från varje counter-option
        option.registerOnChange((value: number) => {
          switch(option.label.toLowerCase()) {
            case 'vuxna':
              this._value.adults = value;
              break;
            case 'barn':
              this._value.children = value;
              break;
            case 'spädbarn':
              this._value.infants = value;
              break;
            case 'husdjur':
              this._value.pets = value;
              break;
          }
          // Meddela föräldrakomponenten om förändringen
          this.valueChange.emit(this._value);
          this.onChange(this._value);
        });
      });
    }
  }

  // Beräkna totalt antal gäster (exklusive husdjur)
  get totalGuests(): number {
    return this._value.adults + this._value.children + this._value.infants;
  }

  // Generera sammanfattningstext för display
  get summary(): string {
    const total = this.totalGuests;
    if (total === 0) return this.placeholder;
    return total === 1 ? '1 gäst' : `${total} gäster`;
  }

  // Uppdatera värdena i counter-options
  updateCounterOptions() {
    if (this.counterOptions) {
      this.counterOptions.forEach(option => {
        switch(option.label.toLowerCase()) {
          case 'vuxna':
            option.value = this._value.adults;
            break;
          case 'barn':
            option.value = this._value.children;
            break;
          case 'spädbarn':
            option.value = this._value.infants;
            break;
          case 'husdjur':
            option.value = this._value.pets;
            break;
        }
      });
    }
  }

  constructor(private _eref: ElementRef) {}

  // Eventlyssnare för klick utanför komponenten
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
