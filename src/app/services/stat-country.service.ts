import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatCountryService {
  constructor(private http: CommonService) {}

  getAllData() {
    return this.http.get('all', {}).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getAllCountryData() {
    return this.http.get('countries', {}).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
