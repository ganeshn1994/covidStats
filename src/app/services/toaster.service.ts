import { Injectable } from '@angular/core';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  constructor(private snotifyService: SnotifyService) {}

  showSuccess(message: any) {
    this.snotifyService.success(message, {
      timeout: 2000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      position: SnotifyPosition.rightTop
    });
  }

  showWarning(message: any) {
    this.snotifyService.warning(message, {
      timeout: 2000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      position: SnotifyPosition.rightTop
    });
  }

  showError(message: any) {
    this.snotifyService.error(message, {
      timeout: 2000,
      showProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      position: SnotifyPosition.rightTop
    });
  }
}
