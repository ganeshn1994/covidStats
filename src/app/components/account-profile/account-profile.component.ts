import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService, BaseService, ToasterService } from 'src/app/services';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit {
  userData: any;
  userForm: FormGroup;
  isSubmitUserForm = false;
  updateEmailsModalId = 'updateEmailsModal';

  constructor(
    private authenticationService: AuthenticationService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private baseService: BaseService,
    private toasterService: ToasterService
  ) {}

  getUser() {
    this.userData = JSON.parse(localStorage.getItem('currentUser'));
    if (
      this.userData &&
      this.userData.id &&
      !this.userData.hasOwnProperty('enableNotification')
    ) {
      this.authenticationService
        .getUserMobileNotification(this.userData.id)
        .subscribe(data => {
          this.userData.enableNotification =
            data && data.enableNotification ? data.enableNotification : false;
          localStorage.setItem('currentUser', JSON.stringify(this.userData));
        });
    }
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
    this.getUser();
  }

  openEmailVerifyModal() {
    this.modalService.openModal(this.updateEmailsModalId);
    this.userForm.controls.email.setValue(this.userData.email);
  }

  enableNotification() {}

  userVerify(event: any) {
    this.isSubmitUserForm = true;
    const req = {
      userId: this.baseService.getUserId(),
      email: this.userForm.value.email,
      updateUserEmail: true
    };
    this.authenticationService.updateUserData(req).subscribe(data => {
      if (data && data.result && data.result.status) {
        this.toasterService.showSuccess(
          'Email verification link is sent to your registered Email ID'
        );
        localStorage.setItem(
          'currentUser',
          JSON.stringify(data.result.response)
        );
        this.getUser();
        this.modalService.closeModal(this.updateEmailsModalId);
      }
    });
  }
}
