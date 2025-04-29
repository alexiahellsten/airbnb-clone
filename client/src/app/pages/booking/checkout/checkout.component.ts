import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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
  paymentTime: string = '';
  paymentMethod: string = '';
  constructor(private router: Router) {
    // Set default values
    this.paymentTime = 'Betala hela summan direkt';
    this.paymentMethod = 'Kredit- eller betalkort';
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
  phoneNumber: string = '0701 - 23 45 67';

  // Validation states
  isCardNumberValid: boolean = true;
  isExpiryDateValid: boolean = true;
  isCVVValid: boolean = true;
  isFirstNameValid: boolean = true;
  isLastNameValid: boolean = true;
  isEmailValid: boolean = true;
  isPhoneNumberValid: boolean = true;
  isPostalCodeValid: boolean = true;
  isStreetAddressValid: boolean = true;
  isCityValid: boolean = true;
  isCountryValid: boolean = true;
  isPaymentTimeValid: boolean = true;
  isPaymentMethodValid: boolean = true;

  // Interaction states
  hasInteractedWithCardNumber: boolean = false;
  hasInteractedWithExpiryDate: boolean = false;
  hasInteractedWithCVV: boolean = false;
  hasInteractedWithFirstName: boolean = false;
  hasInteractedWithLastName: boolean = false;
  hasInteractedWithEmail: boolean = false;
  hasInteractedWithPhoneNumber: boolean = false;
  hasInteractedWithPostalCode: boolean = false;
  hasInteractedWithStreetAddress: boolean = false;
  hasInteractedWithCity: boolean = false;
  hasInteractedWithCountry: boolean = false;
  hasInteractedWithPaymentTime: boolean = false;
  hasInteractedWithPaymentMethod: boolean = false;

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

  onCVVInput(event: any) {
    const newValue = event.target.value.replace(/\D/g, '');
    if (newValue.length > 3) {
      this.cvv = newValue.substring(0, 3);
    } else {
      this.cvv = newValue;
    }
    // Only validate format without showing error message
    this.isCVVValid = this.cvv.length === 3 && /^\d+$/.test(this.cvv);
  }

  validateCVV() {
    this.hasInteractedWithCVV = true;
    this.isCVVValid = this.cvv.length === 3 && /^\d+$/.test(this.cvv);
    console.log('CVV Validation:', {
      value: this.cvv,
      isValid: this.isCVVValid,
    });
  }

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
    // Only validate format without showing error message
    const cleanPostalCode = this.postalCode.replace(/\D/g, '');
    this.isPostalCodeValid = cleanPostalCode.length === 5;
  }

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

  onPhoneNumberInput(event: any) {
    const newValue = event.target.value.replace(/\D/g, '');
    let formattedValue = newValue;
    if (newValue.length > 10) {
      formattedValue = newValue.substring(0, 10);
    }
    if (newValue.length > 4) {
      formattedValue =
        newValue.substring(0, 4) +
        ' - ' +
        newValue.substring(4, 6) +
        ' ' +
        newValue.substring(6, 8) +
        ' ' +
        newValue.substring(8, 10);
    }
    this.phoneNumber = formattedValue;
    // Only validate format without showing error message
    const cleanNumber = this.phoneNumber.replace(/\D/g, '');
    this.isPhoneNumberValid = cleanNumber.length === 10;
  }

  validatePhoneNumber() {
    this.hasInteractedWithPhoneNumber = true;
    const cleanNumber = this.phoneNumber.replace(/\D/g, '');
    this.isPhoneNumberValid =
      cleanNumber.length === 10 && /^\d+$/.test(cleanNumber);
    console.log('Phone Number Validation:', {
      value: this.phoneNumber,
      cleanNumber,
      isValid: this.isPhoneNumberValid,
    });
  }

  validateFirstName() {
    this.hasInteractedWithFirstName = true;
    this.isFirstNameValid = this.firstName?.trim().length > 0;
    console.log('First Name Validation:', {
      value: this.firstName,
      isValid: this.isFirstNameValid,
    });
  }

  validateLastName() {
    this.hasInteractedWithLastName = true;
    this.isLastNameValid = this.lastName?.trim().length > 0;
    console.log('Last Name Validation:', {
      value: this.lastName,
      isValid: this.isLastNameValid,
    });
  }

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

  validateStreetAddress() {
    this.hasInteractedWithStreetAddress = true;
    this.isStreetAddressValid = this.streetAddress?.trim().length > 0;
    console.log('Street Address Validation:', {
      value: this.streetAddress,
      isValid: this.isStreetAddressValid,
    });
  }

  validateCity() {
    this.hasInteractedWithCity = true;
    this.isCityValid = this.city?.trim().length > 0;
    console.log('City Validation:', {
      value: this.city,
      isValid: this.isCityValid,
    });
  }

  validateCountry() {
    this.hasInteractedWithCountry = true;
    this.isCountryValid = this.country?.trim().length > 0;
    console.log('Country Validation:', {
      value: this.country,
      isValid: this.isCountryValid,
    });
  }

  validatePaymentTime() {
    this.hasInteractedWithPaymentTime = true;
    this.isPaymentTimeValid = this.paymentTime !== '';
    console.log('Payment Time Validation:', {
      value: this.paymentTime,
      isValid: this.isPaymentTimeValid,
    });
  }

  validatePaymentMethod() {
    this.hasInteractedWithPaymentMethod = true;
    this.isPaymentMethodValid = this.paymentMethod !== '';
    console.log('Payment Method Validation:', {
      value: this.paymentMethod,
      isValid: this.isPaymentMethodValid,
    });
  }

  isFormValid(): boolean {
    // First validate all fields
    this.validateCardNumber();
    this.validateExpiryDate();
    this.validateCVV();
    this.validateFirstName();
    this.validateLastName();
    this.validateEmail();
    this.validatePhoneNumber();
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
      this.isPhoneNumberValid &&
      this.isPostalCodeValid &&
      this.isStreetAddressValid &&
      this.isCityValid &&
      this.isCountryValid &&
      this.isPaymentTimeValid &&
      this.isPaymentMethodValid;

    console.log('Form Validation Result:', {
      cardNumber: this.isCardNumberValid,
      expiryDate: this.isExpiryDateValid,
      cvv: this.isCVVValid,
      firstName: this.isFirstNameValid,
      lastName: this.isLastNameValid,
      email: this.isEmailValid,
      phoneNumber: this.isPhoneNumberValid,
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

  onSubmit() {
    console.log('Form submission started');
    console.log('Form Values:', {
      cardNumber: this.cardNumber,
      expiryDate: this.expiryDate,
      cvv: this.cvv,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      postalCode: this.postalCode,
      streetAddress: this.streetAddress,
      city: this.city,
      country: this.country,
      paymentTime: this.paymentTime,
      paymentMethod: this.paymentMethod,
    });

    // Mark all fields as interacted with to show validation messages
    this.hasInteractedWithCardNumber = true;
    this.hasInteractedWithExpiryDate = true;
    this.hasInteractedWithCVV = true;
    this.hasInteractedWithFirstName = true;
    this.hasInteractedWithLastName = true;
    this.hasInteractedWithEmail = true;
    this.hasInteractedWithPhoneNumber = true;
    this.hasInteractedWithPostalCode = true;
    this.hasInteractedWithStreetAddress = true;
    this.hasInteractedWithCity = true;
    this.hasInteractedWithCountry = true;
    this.hasInteractedWithPaymentTime = true;
    this.hasInteractedWithPaymentMethod = true;

    console.log('Running form validation...');
    const isValid = this.isFormValid();
    console.log('Form validation result:', isValid);

    if (isValid) {
      console.log('Form is valid, navigating to home...');
      this.router.navigate(['/home']).then(
        (success) => console.log('Navigation successful:', success),
        (error) => console.error('Navigation failed:', error)
      );
    } else {
      console.log('Form is invalid, showing validation messages');
    }
  }

  onPaymentTimeChange() {
    this.validatePaymentTime();
  }

  onPaymentMethodChange() {
    this.validatePaymentMethod();
  }
}
