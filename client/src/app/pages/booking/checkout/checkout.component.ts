import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BookingService } from '../../../services/booking.service';
import { BookingCartService } from '../../../services/booking-cart.service';

import { ButtonComponent } from '../../../components/common/button/button.component';
import { TextInputComponent } from '../../../components/common/form-controls/text-input/text-input.component';
import { SelectBoxComponent } from '../../../components/common/form-controls/select-box/select-box.component';
import { LinkComponent } from '../../../components/common/link/link.component';

@Component({
  selector: 'app-checkout',
  imports: [
    FormsModule,
    CommonModule,
    ButtonComponent,
    TextInputComponent,
    SelectBoxComponent,
    LinkComponent,
    RouterModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})

export class CheckOutComponent {
  // Bokningsdata från varukorgen (booking-cart)
  bookings: any[] = [];
  totalPrice: number = 0;

  paymentTime: string = '';
  paymentMethod: string = '';
  constructor(
    private bookingService: BookingService,
    private bookingCartService: BookingCartService,
    private router: Router
  ) {
    // Sätter standardvärden
    this.paymentTime = 'Betala hela summan direkt';
    this.paymentMethod = 'Kredit- eller betalkort';

    // Hämtar bokningsdata från varukorgen
    this.bookings = this.bookingCartService.getBookingData();
    this.calculateTotalPrice();
  }

  // Beräknar totalpriset för alla bokningar
  private calculateTotalPrice() {
    this.totalPrice = this.bookings.reduce((sum, booking) => sum + booking.total_price, 0);
  }

  //Värdena är förifyllda pga jobbigt att skriva in allting.. Om önskas så är det bara att tömma allt
  // Betalningsrelaterade fält
  cardNumber: string = '4556 7375 8689 9855';
  expiryDate: string = '12/26';
  cvv: string = '123';
  firstName: string = 'Anna';
  lastName: string = 'Svensson';
  streetAddress: string = 'Storgatan 45';

  postalCode: string = '123 45';
  city: string = 'Stockholm';
  country: string = 'Sverige';
  email: string = 'anna.svensson@example.com';

  // Tillstånd för validering
  isCardNumberValid: boolean = true;
  isExpiryDateValid: boolean = true;
  isCVVValid: boolean = true;
  isFirstNameValid: boolean = true;
  isLastNameValid: boolean = true;
  isEmailValid: boolean = true;
  isPostalCodeValid: boolean = true;
  isStreetAddressValid: boolean = true;
  isCityValid: boolean = true;
  isCountryValid: boolean = true;
  isPaymentTimeValid: boolean = true;
  isPaymentMethodValid: boolean = true;

  // Tillstånd för interaktion
  hasInteractedWithCardNumber: boolean = false;
  hasInteractedWithExpiryDate: boolean = false;
  hasInteractedWithCVV: boolean = false;
  hasInteractedWithFirstName: boolean = false;
  hasInteractedWithLastName: boolean = false;
  hasInteractedWithEmail: boolean = false;
  hasInteractedWithPostalCode: boolean = false;
  hasInteractedWithStreetAddress: boolean = false;
  hasInteractedWithCity: boolean = false;
  hasInteractedWithCountry: boolean = false;
  hasInteractedWithPaymentTime: boolean = false;
  hasInteractedWithPaymentMethod: boolean = false;

  // Funktioner för att hantera input av kortnummer
  onCardNumberInput(event: any) {
    const inputValue = event.target.value.replace(/\D/g, '');
    let formattedValue = inputValue;
    if (inputValue.length > 16) {
      formattedValue = inputValue.substring(0, 16);
    }
    if (inputValue.length > 4) {
      formattedValue = inputValue.replace(/(\d{4})/g, '$1 ').trim();
    }
    this.cardNumber = formattedValue;
    // Only validate format without showing error message
    const cleanNumber = this.cardNumber.replace(/\D/g, '');
    this.isCardNumberValid = cleanNumber.length === 16;
  }

  // Funktioner för att validerar kortnummer
  validateCardNumber() {
    this.hasInteractedWithCardNumber = true;
    const cleanNumber = this.cardNumber.replace(/\D/g, '');
    this.isCardNumberValid =
      cleanNumber.length === 16 && /^\d+$/.test(cleanNumber);
    console.log('Card Number Validation:', {
      value: this.cardNumber,
      cleanNumber,
      isValid: this.isCardNumberValid,
    });
  }

  // Funktioner för att hantera input av utgångsdatum
  onExpiryDateInput(event: any) {
    const inputValue = event.target.value.replace(/\D/g, '');
    let formattedValue = inputValue;
    if (inputValue.length > 4) {
      formattedValue = inputValue.substring(0, 4);
    }
    if (inputValue.length > 2) {
      formattedValue =
        inputValue.substring(0, 2) + '/' + inputValue.substring(2, 4);
    }
    this.expiryDate = formattedValue;
    // Only validate format without showing error message
    const cleanDate = this.expiryDate.replace(/\D/g, '');
    this.isExpiryDateValid = cleanDate.length === 4;
  }

  // Funktioner för att validerar utgångsdatum
  validateExpiryDate() {
    this.hasInteractedWithExpiryDate = true;
    const cleanDate = this.expiryDate.replace(/\D/g, '');
    this.isExpiryDateValid = cleanDate.length === 4 && /^\d+$/.test(cleanDate);
    console.log('Expiry Date Validation:', {
      value: this.expiryDate,
      cleanDate,
      isValid: this.isExpiryDateValid,
    });
  }

  // Funktioner för att hantera input av CVV
  onCVVInput(event: any) {
    const newValue = event.target.value.replace(/\D/g, '');
    if (newValue.length > 3) {
      this.cvv = newValue.substring(0, 3);
    } else {
      this.cvv = newValue;
    }
    // Validerar utan att visa felmeddelande
    this.isCVVValid = this.cvv.length === 3 && /^\d+$/.test(this.cvv);
  }

  // Funktioner för att validera CVV
  validateCVV() {
    this.hasInteractedWithCVV = true;
    this.isCVVValid = this.cvv.length === 3 && /^\d+$/.test(this.cvv);
    console.log('CVV Validation:', {
      value: this.cvv,
      isValid: this.isCVVValid,
    });
  }

  // Funktioner för att hantera input av postnummer
  onPostalCodeInput(event: any) {
    const newValue = event.target.value.replace(/\D/g, '');
    let formattedValue = newValue;
    if (newValue.length > 5) {
      formattedValue = newValue.substring(0, 5);
    }
    if (newValue.length > 3) {
      formattedValue =
        newValue.substring(0, 3) + ' ' + newValue.substring(3, 5);
    }
    this.postalCode = formattedValue;
    // Validerar utan att visa felmeddelande
    const cleanPostalCode = this.postalCode.replace(/\D/g, '');
    this.isPostalCodeValid = cleanPostalCode.length === 5;
  }

  // Funktioner för att validera postnummer
  validatePostalCode() {
    this.hasInteractedWithPostalCode = true;
    const cleanPostalCode = this.postalCode.replace(/\D/g, '');
    this.isPostalCodeValid =
      cleanPostalCode.length === 5 && /^\d+$/.test(cleanPostalCode);
    console.log('Postal Code Validation:', {
      value: this.postalCode,
      cleanPostalCode,
      isValid: this.isPostalCodeValid,
    });
  }

  // Funktioner för att validera förnamn
  validateFirstName() {
    this.hasInteractedWithFirstName = true;
    this.isFirstNameValid = this.firstName?.trim().length > 0;
    console.log('First Name Validation:', {
      value: this.firstName,
      isValid: this.isFirstNameValid,
    });
  }

  // Funktioner för att validera efternamn
  validateLastName() {
    this.hasInteractedWithLastName = true;
    this.isLastNameValid = this.lastName?.trim().length > 0;
    console.log('Last Name Validation:', {
      value: this.lastName,
      isValid: this.isLastNameValid,
    });
  }

  // Funktioner för att validera email
  validateEmail() {
    this.hasInteractedWithEmail = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.isEmailValid =
      this.email?.trim().length > 0 && emailRegex.test(this.email);
    console.log('Email Validation:', {
      value: this.email,
      isValid: this.isEmailValid,
    });
  }

  // Funktioner för att validera gatuadress
  validateStreetAddress() {
    this.hasInteractedWithStreetAddress = true;
    this.isStreetAddressValid = this.streetAddress?.trim().length > 0;
    console.log('Street Address Validation:', {
      value: this.streetAddress,
      isValid: this.isStreetAddressValid,
    });
  }

  // Funktioner för att validera stad
  validateCity() {
    this.hasInteractedWithCity = true;
    this.isCityValid = this.city?.trim().length > 0;
    console.log('City Validation:', {
      value: this.city,
      isValid: this.isCityValid,
    });
  }

  // Funktioner för att validera land
  validateCountry() {
    this.hasInteractedWithCountry = true;
    this.isCountryValid = this.country?.trim().length > 0;
    console.log('Country Validation:', {
      value: this.country,
      isValid: this.isCountryValid,
    });
  }

  // Funktioner för att validera betalningstid
  validatePaymentTime() {
    this.hasInteractedWithPaymentTime = true;
    this.isPaymentTimeValid = this.paymentTime !== '';
    console.log('Payment Time Validation:', {
      value: this.paymentTime,
      isValid: this.isPaymentTimeValid,
    });
  }

  // Funktioner för att validera betalningsmetod
  validatePaymentMethod() {
    this.hasInteractedWithPaymentMethod = true;
    this.isPaymentMethodValid = this.paymentMethod !== '';
    console.log('Payment Method Validation:', {
      value: this.paymentMethod,
      isValid: this.isPaymentMethodValid,
    });
  }

  // Funktioner för att validera formuläret
  isFormValid(): boolean {
    this.validateCardNumber();
    this.validateExpiryDate();
    this.validateCVV();
    this.validateFirstName();
    this.validateLastName();
    this.validateEmail();
    this.validatePostalCode();
    this.validateStreetAddress();
    this.validateCity();
    this.validateCountry();
    this.validatePaymentTime();
    this.validatePaymentMethod();

    const isValid =
      this.isCardNumberValid &&
      this.isExpiryDateValid &&
      this.isCVVValid &&
      this.isFirstNameValid &&
      this.isLastNameValid &&
      this.isEmailValid &&
      this.isPostalCodeValid &&
      this.isStreetAddressValid &&
      this.isCityValid &&
      this.isCountryValid &&
      this.isPaymentTimeValid &&
      this.isPaymentMethodValid;

    console.log('Formulärvalideringsresultat:', {
      cardNumber: this.isCardNumberValid,
      expiryDate: this.isExpiryDateValid,
      cvv: this.isCVVValid,
      firstName: this.isFirstNameValid,
      lastName: this.isLastNameValid,
      email: this.isEmailValid,
      postalCode: this.isPostalCodeValid,
      streetAddress: this.isStreetAddressValid,
      city: this.isCityValid,
      country: this.isCountryValid,
      paymentTime: this.isPaymentTimeValid,
      paymentMethod: this.isPaymentMethodValid,
      overall: isValid,
    });

    return isValid;
  }

  // Funktioner för att skapa en bokning
  async onSubmit() {
    try {
      const bookingData = this.bookingCartService.getBookingData();
      if (!bookingData.length) {
        console.error('Inga bokningsdata hittades');
        return;
      }

      // Skapar alla bokningar
      const createdBookings = await Promise.all(
        bookingData.map(booking => 
          this.bookingService.createBooking({
            user_id: booking.user_id,
            listing_id: booking.listing_id,
            start_date: booking.start_date,
            end_date: booking.end_date,
            total_price: booking.total_price,
            guests: booking.guests,
            status: 'Väntar på bekräftelse' as const
          })
        )
      );

      // Hämtar alla boknings-ID:n
      const bookingIds = createdBookings.map(booking => booking.id);

      // Rensa varukorgen
      this.bookingCartService.clearBookings();

      // Navigera till booking-confirmation med alla boknings-ID:n
      this.router.navigate(['/booking-confirmation'], { 
        queryParams: { ids: bookingIds.join(',') }
      });
    } catch (error) {
      console.error('Fel vid skapande av bokning:', error);
    }
  }

  onPaymentTimeChange() {
    this.validatePaymentTime();
  }

  // Funktioner för att hantera ändring av betalningstid
  onPaymentMethodChange() {
    this.validatePaymentMethod();
  }

  // Funktioner för att hantera input av förnamn
  onFirstNameInput(event: any) {
    this.firstName = event.target.value;
    this.hasInteractedWithFirstName = true;
    this.validateFirstName();
  }

  // Funktioner för att hantera blur av förnamn
  onFirstNameBlur() {
    this.hasInteractedWithFirstName = true;
    this.validateFirstName();
  }

  // Funktioner för att hantera input av efternamn
  onLastNameInput(event: any) {
    this.lastName = event.target.value;
    this.hasInteractedWithLastName = true;
    this.validateLastName();
  }

  // Funktioner för att hantera blur av efternamn
  onLastNameBlur() {
    this.hasInteractedWithLastName = true;
    this.validateLastName();
  }

  // Funktioner för att hantera input av email
  onEmailInput(event: any) {
    this.email = event.target.value;
    this.hasInteractedWithEmail = true;
    this.validateEmail();
  }

  // Funktioner för att hantera blur av email
  onEmailBlur() {
    this.hasInteractedWithEmail = true;
    this.validateEmail();
  }

  // Funktioner för att hantera blur av postnummer
  onPostalCodeBlur() {
    this.hasInteractedWithPostalCode = true;
    this.validatePostalCode();
  }

  // Funktioner för att hantera input av gatuadress
  onStreetAddressInput(event: any) {
    this.streetAddress = event.target.value;
    this.hasInteractedWithStreetAddress = true;
    this.validateStreetAddress();
  }

  // Funktioner för att hantera blur av gatuadress
  onStreetAddressBlur() {
    this.hasInteractedWithStreetAddress = true;
    this.validateStreetAddress();
  }

  // Funktioner för att hantera input av stad
  onCityInput(event: any) {
    this.city = event.target.value;
    this.hasInteractedWithCity = true;
    this.validateCity();
  }

  // Funktioner för att hantera blur av stad
  onCityBlur() {
    this.hasInteractedWithCity = true;
    this.validateCity();
  }

  // Funktioner för att hantera input av land
  onCountryInput(event: any) {
    this.country = event.target.value;
    this.hasInteractedWithCountry = true;
    this.validateCountry();
  }

  // Funktioner för att hantera blur av land
  onCountryBlur() {
    this.hasInteractedWithCountry = true;
    this.validateCountry();
  }

  // Funktioner för att hantera blur av utgångsdatum
  onExpiryDateBlur() {
    this.hasInteractedWithExpiryDate = true;
    this.validateExpiryDate();
  }

  // Funktioner för att hantera blur av CVV
  onCVVBlur() {
    this.hasInteractedWithCVV = true;
    this.validateCVV();
  }
}
