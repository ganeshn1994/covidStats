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
  businessId: any;

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
      // const businessId = localStorage.getItem('selectedBusiness');
      this.authenticationService.businessId.subscribe(id => {
        if (id) {
          this.businessId = JSON.parse(id);
          const placeType = localStorage.getItem('placeType');

          if (placeType === 'Pharmacy') {
            this.router.navigateByUrl('/retailer/home/' + this.businessId);
          } else if (placeType === 'Distributor') {
            this.router.navigateByUrl('/stockist/home/' + this.businessId);
          } else if (placeType === 'Stockist') {
            this.router.navigateByUrl(
              '/super-stockist/home/' + this.businessId
            );
          } else if (placeType === 'MarketingCompany') {
            this.router.navigateByUrl(
              '/marketing-company/home/' + this.businessId
            );
          }
        }
      });
    }
  }

  getBannerDeals() {
    this.landingService.getBannerDeals().subscribe(data => {
      this.bannerCount = data.count;
      this.bannerSlides = data.response;
    });
  }
}
