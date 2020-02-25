import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderReturnService {
  constructor(private http: CommonService) {}

  getOrderReturn(req: any) {
    return this.http.post('filterOrderReturn', {}, req).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  updateOrderReturn(req: any) {
    return this.http.put('orderReturn/' + req.returnId, {}, req).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }
}
