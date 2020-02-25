import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  constructor(private http: CommonService) {}

  getAllERPBusinessDetails(req: any) {
    return this.http.post('getAllERPBusinessDetails', {}, req).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  getAllERPDetails(req: any) {
    return this.http.post('getAllERPDetails', {}, req).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }
}
