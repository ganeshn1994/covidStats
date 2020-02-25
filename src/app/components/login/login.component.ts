import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { LoaderService } from '../../services/loader.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  editMobileForm: FormGroup;

  loginPage = {
    title: 'Login',
    password: false,
    verify: false,
    submitted: false,
    OTPLink: false,
    OTPBlock: false,
    otp: '',
    isCalledOTP: false,
    seconds: 20,
    mobileNumber: '',
    editMobileNumberBlock: false,
    loading: false,
    oldMobileNumber: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private routers: ActivatedRoute,
    private loaderService: LoaderService,
    private toasterService: ToasterService,
    private authenticationService: AuthenticationService
  ) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

    const mobileNumber = this.routers.snapshot.paramMap.get('mobileNumber');
    const changeMobileNumber = this.routers.snapshot.paramMap.get(
      'changeMobileNumber'
    );

    if (mobileNumber) {
      this.loginPage.mobileNumber = mobileNumber;
      this.loginPage.OTPBlock = true;
      this.loginPage.title = 'Verify';
    }

    if (changeMobileNumber) {
      this.loginPage.oldMobileNumber = changeMobileNumber;
      this.loginPage.OTPBlock = false;
      this.loginPage.editMobileNumberBlock = true;
      this.loginPage.title = 'Edit Phone Number';
    }

    this.loaderService.loading.subscribe(value => {
      this.loginPage.loading = value;
    });
  }

  get f() {
    return this.loginForm.controls;
  }
  get f1() {
    return this.editMobileForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.editMobileForm = this.formBuilder.group({
      mobileNumber: [
        this.loginPage.oldMobileNumber ? this.loginPage.oldMobileNumber : '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]
      ]
    });

    if (this.loginPage.mobileNumber) {
      this.loginForm.value.username = this.loginPage.mobileNumber;
      this.getOTP();
    }
  }

  login() {
    this.loginPage.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const userData: any = {
      username: this.loginForm.value.username
    };

    if (this.loginPage.password) {
      userData.password = this.loginForm.value.password;
    }

    this.authenticationService.login(userData).subscribe(
      data => {
        if (data && data.showPasswordField) {
          this.loginPage.OTPLink = data.showLoginOTPLink;
          this.loginPage.password = data.showPasswordField;
          this.loginPage.verify = false;
          this.loginPage.submitted = false;
          this.loginForm = this.formBuilder.group({
            username: [this.loginForm.value.username, Validators.required],
            password: ['', Validators.required]
          });
        } else if (data.otpSent) {
          this.router.navigate(['verify', userData.username]);
        }

        if (data && data.id) {
          this.toasterService.showSuccess('You are successfully loggedIn');
          this.router.navigate(['mybusiness']);
        } else if (
          !data.valid &&
          (!data.showPasswordField || !data.showLoginOTPLink)
        ) {
          this.toasterService.showError(data.status);
          return;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  navigateOTPPage() {
    const queryParams = {
      mobileNumber: this.loginPage.OTPBlock
        ? this.loginPage.mobileNumber
        : this.loginForm.value.username
    };
    this.router.navigate(['verify/', queryParams]);
  }

  getOTP() {
    const userData = {
      mobileNumber: this.loginPage.OTPBlock
        ? this.loginPage.mobileNumber
        : this.loginForm.value.username,
      otpSource: 'MDXMOBINOLOGIN'
    };

    this.authenticationService.sendAuthOtp(userData).subscribe(data => {
      if (data.valid) {
        this.loginPage.title = 'Verify';
        this.loginPage.OTPBlock = true;
        this.loginPage.isCalledOTP = true;
        const progressInterval = setInterval(() => {
          this.loginPage.seconds = this.loginPage.seconds - 1;
          if (this.loginPage.seconds === 1) {
            clearInterval(progressInterval);
            this.loginPage.isCalledOTP = false;
            this.loginPage.seconds = 20;
          }
        }, 1000);
      }
    });
  }

  validateUserOTP() {
    const data = {
      mobileNumber: this.loginPage.mobileNumber,
      source: 'MDXMOBINOLOGIN',
      OTP: this.loginPage.otp,
      otpLogin: true
    };

    this.authenticationService.validateUserOTP(data).subscribe((res: any) => {
      if (res) {
        if (res.valid) {
          this.toasterService.showSuccess('You are successfully loggedIn');
          this.router.navigate(['myBusiness']);
        } else {
          this.loginPage.submitted = false;
          this.loginPage.otp = '';
          this.toasterService.showError('Please Enter the Valid OTP Number');
        }
      }
    });
  }

  editPhoneNumber() {
    this.loginPage.submitted = true;
    if (this.editMobileForm.invalid) {
      return;
    }

    const userData = {
      username: this.editMobileForm.value.mobileNumber
    };

    this.authenticationService.login(userData).subscribe(data => {
      if (data && data.showPasswordField && data.showLoginOTPLink) {
        const queryParams = {
          mobileNumber: userData.username
        };
        this.router.navigate(['verify/', queryParams]);
      } else {
        this.toasterService.showError(data.status);
      }
    });
    // this.router.navigate(['verify', this.editMobileForm.value.mobileNumber]);
  }

  isNumber(val: any) {
    if (val === undefined || val === null || val === '') {
      this.loginPage.password = false;
      this.loginPage.verify = true;
      return;
    }
    if (this.stringIsNumber(this.loginForm.value.username)) {
      this.loginForm.controls.password.setValue('');
      this.loginPage.password = false;
      this.loginPage.verify = true;
      this.loginForm = this.formBuilder.group({
        username: [this.loginForm.value.username, Validators.required],
        password: [this.loginForm.value.password]
      });
    } else {
      this.loginPage.password = true;
      this.loginPage.verify = false;
      this.loginForm = this.formBuilder.group({
        username: [this.loginForm.value.username, Validators.required],
        password: [this.loginForm.value.password, Validators.required]
      });
    }
  }

  stringIsNumber(s) {
    const x = +s;
    return x.toString() === s;
  }

  editMobilenumber() {
    const queryParams = {
      changeMobileNumber: this.loginPage.OTPBlock
        ? this.loginPage.mobileNumber
        : this.loginForm.value.username
    };
    this.router.navigate(['editPhoneNumber/', queryParams]);
  }
}
