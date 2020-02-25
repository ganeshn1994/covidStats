import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-control-message',
  templateUrl: './control-message.component.html',
  styleUrls: ['./control-message.component.scss']
})
export class ControlMessageComponent implements OnInit {
  @Input() control: FormControl;
  @Input() title: string;
  @Input() isFormSubmit: boolean;
  displayError: string;
  errorMsg: string;
  constructor() {}

  ngOnInit() {}

  get errorMessage() {
    if (this.control) {
      for (const propertyName in this.control.errors) {
        if (
          this.submit &&
          this.control.touched &&
          this.control.errors.hasOwnProperty(propertyName) &&
          this.control.dirty &&
          !this.control.valid
        ) {
          return ValidationService.getValidatorErrorMessage(
            propertyName,
            this.control.errors[propertyName]
          );
        } else if (this.submit && !this.control.valid) {
          return ValidationService.getValidatorErrorMessage(
            propertyName,
            this.control.errors[propertyName]
          );
        } else if (
          this.control.touched &&
          this.control.errors.hasOwnProperty(propertyName) &&
          this.control.dirty &&
          !this.control.valid
        ) {
          return ValidationService.getValidatorErrorMessage(
            propertyName,
            this.control.errors[propertyName]
          );
        }
      }
    }
    return null;
  }

  get submit() {
    return this.isFormSubmit;
  }
}
