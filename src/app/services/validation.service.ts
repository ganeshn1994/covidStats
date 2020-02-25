import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      required: 'is required',
      minLengthArray: 'minLengthArray',
      email: 'is Invalid',
      pattern: 'is Invalid',
      dealErrorMsg:
        '- Stocks Available For Medibox should be more than Max. Quantity per Retailer',
      nearExpiryMsg: 'Near Expiry',
      invalidPassword:
        'Invalid password. Password must be at least 6 characters long, and contain a number.',
      minlength: `Minimum length ${validatorValue.requiredLength}`
    };
    return config[validatorName];
  }

  static emailValidator(control) {
    if (control.value) {
      if (
        control.value.match(
          /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/
        )
      ) {
        return null;
      } else {
        return {
          invalidEmailAddress: true
        };
      }
    }
  }

  static minLengthArray(min: number) {
    return (
      c: AbstractControl
    ): {
      [key: string]: any;
    } => {
      if (c.value.length >= min) return null;
      return {
        minLengthArray: {
          valid: false
        }
      };
    };
  }
}
