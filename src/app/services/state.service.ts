import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(private http: CommonService) {}

  getStatesSuggestions(req: any) {
    return this.http.post('getStateSuggestion', {}, req).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  getCitiesSuggestions(req: any) {
    return this.http.post('getCitiesSuggestion', {}, req).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }
}
