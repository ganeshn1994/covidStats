import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';
import { ToasterService, ModalService } from 'src/app/services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  title = 'Forgot Password';
  forgotPasswordForm: FormGroup;
  isSubmitForgotPasswordForm = false;
  modalTitle = 'Email Sent';
  forgotPasswordModalId = 'forgotPasswordModal';
  email: any;
  responseData: any;
  constructor(
    private formBuilder: FormBuilder,
    private forgotService: ForgotPasswordService,
    private toastrService: ToasterService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  forgotPassword() {
    this.isSubmitForgotPasswordForm = true;
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    const forgotQuery = {
      username: this.forgotPasswordForm.value.email
    };
    this.forgotService.postForgetPassword(forgotQuery).subscribe(data => {
      this.responseData = data;
      this.modalService.openModal(this.forgotPasswordModalId);
    });
  }

  closeModal() {
    this.router.navigateByUrl('login');
  }
}
