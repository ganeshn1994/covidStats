import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: CommonService) {}

  getUsers(req: any) {
    return this.http.post('usersData', {}, req).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  getUsersCount(req: any) {
    return this.http.post('userCount', {}, req).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  deActivateUser(req: any, userId: any) {
    return this.http.put('users/' + userId, {}, req).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  activateUser(req: any, userId: any) {
    return this.http.put('users/' + userId, {}, req).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  getMyBusinessData(req) {
    return this.http.get('myBusinessData/', req).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateUserRole(req: any) {
    return this.http.post('updateuserrole', {}, req).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  updateadminDashboard(req: any) {
    return this.http.post('updateuseradmindashboard', {}, req).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }
}
