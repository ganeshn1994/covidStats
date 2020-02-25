import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {
  constructor(private http: CommonService) {}

  getBannerDeals() {
    return this.http.get('deal/bannerDeals/', {}).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
