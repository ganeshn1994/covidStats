import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData: any;

  constructor(
    private authenticationService: AuthenticationService,
    private toasterService: ToasterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authenticationService.userData.subscribe(user => {
      if (user) {
        this.userData = user;
      }
    });
  }

  logout() {
    this.authenticationService.logout().subscribe(data => {
      if (data.success) {
        this.toasterService.showSuccess('You are successfully logged out');
        this.router.navigate(['/login']);
      }
    });
  }

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }
}
