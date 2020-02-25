import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  LoaderService,
  ToasterService,
  AuthenticationService
} from 'src/app/services';
import { MustMatch } from 'src/app/models/must-match';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  setPasswordForm: FormGroup;
  submitted = false;
  userId: any;
  mobileNumber: any;
  email: any;
  firstName: any;
  otp: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private routers: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
    this.userId = this.routers.snapshot.paramMap.get('loginUserId');
    this.mobileNumber = this.routers.snapshot.paramMap.get('mobileNumber');
    this.email = this.routers.snapshot.paramMap.get('email');
    this.firstName = this.routers.snapshot.paramMap.get('firstName');
    this.otp = this.routers.snapshot.paramMap.get('otp');
  }

  ngOnInit() {
    this.setPasswordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );
  }

  get f() {
    return this.setPasswordForm.controls;
  }

  setPassword() {
    this.submitted = true;
    if (this.setPasswordForm.invalid) {
      return;
    }
    const req = {
      mobileNumber: this.mobileNumber,
      OTP: this.otp,
      source: 'MDXREGISTRATION',
      firstName: this.firstName,
      email: this.email,
      userType: 'CP',
      password: this.setPasswordForm.value.password
    };

    this.authenticationService.validateUserOTP(req).subscribe((data: any) => {
      if (data && data.mobileNumber) {
        const userData = {
          name: data.name && data.name.first ? data.name.first : '',
          email: this.email,
          mobileNumber: parseFloat(this.mobileNumber),
          userId: data.id ? data.id : '',
          urlHost: environment.urlHost
        };

        this.authenticationService
          .createShortIdForRegistration(userData)
          .subscribe(res => {
            if (res) {
              this.router.navigate(['/profile']);
            }
          });
      }
    });
  }
}
