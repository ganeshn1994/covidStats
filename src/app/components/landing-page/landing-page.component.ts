import { Component, OnInit } from '@angular/core';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { AuthenticationService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  bannerSlides: any[] = [];
  bannerCount: any;
  userData: any;

  constructor(
    private landingService: LandingPageService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  ngOnInit() {
    this.authenticationService.userData.subscribe(user => {
      if (user) {
        this.userData = user;
      }
    });
    this.getBannerDeals();
    if (this.isLoggedIn()) {
      const businessId = localStorage.getItem('selectedBusiness');
      const placeType = localStorage.getItem('placeType');

      if (placeType === 'Pharmacy') {
        this.router.navigateByUrl('/retailer/home/' + businessId);
      } else if (placeType === 'Distributor') {
        this.router.navigateByUrl('/stockist/home/' + businessId);
      } else if (placeType === 'Stockist') {
        this.router.navigateByUrl('/super-stockist/home/' + businessId);
      } else if (placeType === 'MarketingCompany') {
        this.router.navigateByUrl('/marketing-company/home/' + businessId);
      }
    }
  }

  getBannerDeals() {
    this.landingService.getBannerDeals().subscribe(data => {
      this.bannerCount = data.count;
      this.bannerSlides = data.response;
    });
  }
}
