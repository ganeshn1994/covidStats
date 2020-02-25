import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  NavigationExtras
} from '@angular/router';
import {
  LoaderService,
  ToasterService,
  AuthenticationService
} from 'src/app/services';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  editMobileForm: FormGroup;

  registerPage = {
    title: 'Register',
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
    oldMobileNumber: '',
    firstName: '',
    email: ''
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
    this.registerPage.firstName = this.routers.snapshot.paramMap.get(
      'firstName'
    );

    const changeMobileNumber = this.routers.snapshot.paramMap.get(
      'changeMobileNumber'
    );

    this.registerPage.email = this.routers.snapshot.paramMap.get('email');

    if (mobileNumber) {
      this.registerPage.mobileNumber = mobileNumber;
      this.registerPage.OTPBlock = true;
      this.registerPage.title = 'Verify';
    }

    if (changeMobileNumber) {
      this.registerPage.oldMobileNumber = changeMobileNumber;
      this.registerPage.OTPBlock = false;
      this.registerPage.editMobileNumberBlock = true;
      this.registerPage.title = 'Edit Phone Number';
    }

    this.loaderService.loading.subscribe(value => {
      this.registerPage.loading = value;
    });
  }

  get name() {
    return this.registerForm.get('name');
  }

  get mobileNumber() {
    return this.registerForm.get('mobileNumber');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get r() {
    return this.registerForm.controls;
  }
  get f1() {
    return this.editMobileForm.controls;
  }

  hasNumber(firstName: any) {
    return /\d/.test(firstName);
  }

  checkForMoreWords(firstName: any) {
    if (firstName) {
      const totalWords = firstName.split(' ');
      if (totalWords.length === 2) {
        return true;
      }
      return false;
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]
      ],
      terms: [false],
      email: [
        '',
        [
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]
      ]
    });

    this.editMobileForm = this.formBuilder.group({
      mobileNumber: [
        this.registerPage.oldMobileNumber
          ? this.registerPage.oldMobileNumber
          : '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]
      ]
    });

    if (this.registerPage.mobileNumber) {
      this.registerForm.value.username = this.registerPage.mobileNumber;
      this.getOTP();
    }
  }

  register() {
    this.registerPage.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    if (this.checkForMoreWords(this.registerForm.value.name)) {
      if (this.hasNumber(this.registerForm.value.name)) {
        this.registerForm.controls.name.setErrors({
          incorrect: true
        });
        this.toasterService.showWarning('Name Should Be Alphabets');
        return;
      }
    } else {
      this.registerForm.controls.name.setErrors({
        incorrect: true
      });
      this.toasterService.showWarning('Enter First Name And Last Name Only');
      return;
    }

    const userData = {
      username: this.registerForm.value.mobileNumber,
      firstName: this.registerForm.value.name,
      email: this.registerForm.value.email
    };

    this.authenticationService.toCheckUserExists(userData).subscribe(
      data => {
        if (!data.userExists && data.otpSent) {
          const queryParams = {
            mobileNumber: userData.username,
            firstName: userData.firstName,
            email: userData.email
          };
          this.router.navigate(['validateUserOTP/', queryParams]);
        } else {
          this.toasterService.showWarning(data.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getOTP() {
    const userData = {
      username: this.registerPage.OTPBlock
        ? this.registerPage.mobileNumber
        : this.registerForm.value.username,
      otpSource: ''
    };

    this.authenticationService.sendAuthOtp(userData).subscribe(data => {
      if (data.valid) {
        this.registerPage.title = 'Verify';
        this.registerPage.OTPBlock = true;
        this.registerPage.isCalledOTP = true;
        const progressInterval = setInterval(() => {
          this.registerPage.seconds = this.registerPage.seconds - 1;
          if (this.registerPage.seconds === 1) {
            clearInterval(progressInterval);
            this.registerPage.isCalledOTP = false;
            this.registerPage.seconds = 20;
          }
        }, 1000);
      }
    });
  }

  validateUserOTP() {
    const data = {
      mobileNumber: this.registerPage.mobileNumber,
      OTP: this.registerPage.otp,
      source: 'MDXREGISTRATION',
      firstName: this.registerPage.firstName,
      email: this.registerPage.email,
      userType: 'CP'
    };

    this.authenticationService.validateUserOTP(data).subscribe((res: any) => {
      if (res) {
        if (res.valid && res.setPassword) {
          const routeParams = {
            source: 'MDXREGISTRATION',
            firstName: this.registerPage.firstName,
            mobileNumber: this.registerPage.mobileNumber,
            otp: this.registerPage.otp,
            email: this.registerPage.email,
            loginSource: 'MDXREGISTRATION'
          };

          this.router.navigate(['setPassword/', routeParams]);
        } else {
          this.registerPage.submitted = false;
          this.registerPage.otp = '';
          this.toasterService.showError('Please Enter the Valid OTP Number');
        }
      }
    });
  }

  editPhoneNumber() {
    this.registerPage.submitted = true;

    if (this.editMobileForm.invalid) {
      return;
    }

    const queryParams = {
      mobileNumber: this.editMobileForm.value.mobileNumber,
      firstName: this.registerPage.firstName,
      email: this.registerPage.email
    };

    this.authenticationService.toCheckUserExists(queryParams).subscribe(
      data => {
        if (!data.userExists && data.otpSent) {
          this.router.navigate(['validateUserOTP/', queryParams]);
        } else {
          this.toasterService.showWarning(data.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  editMobilenumber() {
    const queryParams = {
      changeMobileNumber: this.registerPage.mobileNumber,
      firstName: this.registerPage.firstName,
      email: this.registerPage.email
    };
    this.router.navigate(['editMobileNumber/', queryParams]);
  }
}
