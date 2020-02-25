import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  constructor(private http: CommonService) {}

  postForgetPassword(requestParams: any) {
    return this.http.post('forgot', {}, requestParams).pipe(
      map((response: any) => {
        return response.body.result;
      })
    );
  }
}
