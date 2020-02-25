import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyBusinessService {
  public selectedProductType = new BehaviorSubject(0);
  constructor(private http: CommonService) {}

  getMyBusinessData(req: any) {
    return this.http.get('myBusinessData/', req).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getProductType(req: any) {
    return this.http.get('deal/filters/', req).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  // getBusinessDetails(req: any) {
  //   let url = '';
  //   const placeType = localStorage.getItem('placeType');
  //   if (placeType === 'Pharmacy') {
  //     url = 'pharmacies';
  //   } else if (placeType === 'Distributor') {
  //     url = 'distributors';
  //   } else if (placeType === 'Stockist') {
  //     url = 'stockists';
  //   } else if (placeType === 'MarketingCompany') {
  //     url = 'marketingCompanies';
  //   }
  //   return this.http.get(url, req).pipe(
  //     map((response: any) => {
  //       return response;
  //     })
  //   );
  // }
}
