import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseService, ToasterService, CommonService } from '../index';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public featureId: any;
  public businessId = new BehaviorSubject(
    JSON.parse(localStorage.getItem('selectedBusiness'))
  );
  public activeBusiness = new BehaviorSubject(null);

  public userData = new BehaviorSubject(
    JSON.parse(localStorage.getItem('currentUser'))
  );
  userAccessFeatureData = [];

  private JWTSubject: BehaviorSubject<any>;
  public JWT: Observable<any>;

  constructor(
    private http: CommonService,
    private activatedRoute: ActivatedRoute,
    private baseService: BaseService
  ) {
    this.JWTSubject = new BehaviorSubject<any>(localStorage.getItem('JWT'));
    this.JWT = this.JWTSubject.asObservable();
  }

  public get JWTValue(): any {
    return this.JWTSubject.value;
  }

  /*Generate Url by Role Name */
  generateUrl(name: any) {
    const urls = name.split(' ');
    let url = '';

    urls.forEach(element => {
      if (url) {
        url = url + '-' + element;
      } else {
        url = element;
      }
    });

    return url;
  }

  toCheckUserExists(userData: any) {
    return this.http.post('toCheckUserExists', {}, userData).pipe(
      map((response: any) => {
        this.setUser(response);
        return response.body.result;
      })
    );
  }

  login(userData: any) {
    const headers = {};
    userData.source = 'MDXMOBINOLOGIN';

    return this.http.post('login', headers, userData).pipe(
      map((response: any) => {
        this.setUser(response);
        // if (
        //   response.body.result &&
        //   (response.body.result.id ||
        //     (response.body.result.userDetails &&
        //       response.body.result.userDetails.id))
        // ) {
        //   this.getUserFeatures().subscribe(featureData => {});
        // }
        return response.body.result;
      })
    );
  }

  setUser(data: any) {
    const JWT = data.headers.get('Authorization');
    if (JWT) {
      this.JWTSubject.next(JWT);
      localStorage.setItem('JWT', JWT);
    }

    if (
      data.body.result &&
      (data.body.result.id ||
        (data.body.result.userDetails && data.body.result.userDetails.id))
    ) {
      const currentUser = data.body.result.userDetails
        ? data.body.result.userDetails
        : data.body.result;
      this.userData.next(currentUser);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }

  removeUser(status: any) {
    if (status) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('JWT');
      localStorage.removeItem('userAccessFeatureData');
      localStorage.removeItem('selectedBusiness');
      localStorage.removeItem('placeType');
      localStorage.removeItem('placeType');
      this.userData.next(null);
      this.businessId.next(null);
      this.JWTSubject.next(null);
    }
  }

  sendAuthOtp(userData: any) {
    const headers = {};
    return this.http.post('sendAuthOtp', headers, userData).pipe(
      map((response: any) => {
        return response.body.result;
      })
    );
  }

  createShortIdForRegistration(req: any) {
    return this.http.post('createShortIdForRegistration', {}, req).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  validateUserOTP(userData: any) {
    const headers = {};

    return this.http.post('validateUserOTP', headers, userData).pipe(
      map((response: any) => {
        if (response.body.result && response.body.result.valid) {
          if (!response.body.result.setPassword) {
            this.setUser(response);
            this.getUserFeatures().subscribe(featureData => {});
          }
        }
        return response.body.result;
      })
    );
  }

  logout() {
    return this.http.post('logout', {}, {}).pipe(
      map((response: any) => {
        this.removeUser(response.body.result.success);
        return response.body.result;
      })
    );
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      return false;
    }
  }

  updateUserData(req: any) {
    return this.http.post('updateUserData', {}, req).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  getUserMobileNotification(mobile: number) {
    return this.http.get('getUserMobileNotification/' + mobile, {}).pipe(
      map((response: any) => {
        return response.result;
      })
    );
  }

  getUserFeatures() {
    const body = {
      userId: this.baseService.getUserId()
    };

    return this.http.post('getuserfeatures', {}, body).pipe(
      map((response: any) => {
        if (response.body.response.data) {
          response.body.response.data.sort((a: any, b: any) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });

          const mapData = new Map();
          this.userAccessFeatureData = [];

          for (let i = 0; i < response.body.response.data.length; i++) {
            if (response.body.response.data[i].name === 'master edit') {
              this.baseService.masterEdit.next(true);
            }
            if (!mapData.has(response.body.response.data[i])) {
              if (
                response.body.response.data[i].parentLevel === 0 &&
                response.body.response.data[i].featureLevel === 1 &&
                response.body.response.data[i].group === 'Medibox' &&
                response.body.response.data[i].name !== 'management data'
              ) {
                mapData.set(response.body.response.data[i], true);
                response.body.response.data[i].url = this.generateUrl(
                  response.body.response.data[i].name
                );
                this.userAccessFeatureData.push(response.body.response.data[i]);
              }
            }
          }

          for (let i = 0; i < response.body.response.data.length; i++) {
            for (let j = 0; j < this.userAccessFeatureData.length; j++) {
              if (
                this.userAccessFeatureData[j].name ===
                response.body.response.data[i].group
              ) {
                if (!this.userAccessFeatureData[j].children) {
                  this.userAccessFeatureData[j].children = [];
                }
                response.body.response.data[i].url = this.generateUrl(
                  response.body.response.data[i].name
                );
                this.userAccessFeatureData[j].children.push(
                  response.body.response.data[i]
                );
              }
            }
          }

          localStorage.setItem(
            'userAccessFeatureData',
            JSON.stringify(this.userAccessFeatureData)
          );
        }
        return response.body.response.data;
      })
    );
  }

  setFeatureId(featureId: any) {
    this.featureId = featureId;
  }

  getFeatureId() {
    return this.featureId;
  }

  setBusinessId(businessId: any) {
    this.businessId.next(businessId);
  }

  setActiveBusiness(business: any) {
    this.activeBusiness.next(business);
  }

  accessFeatureByFeatureId() {
    let featureId: any;
    if (!this.featureId) {
      let url: any;

      this.activatedRoute.url.subscribe(() => {
        url = window.location.pathname;
      });

      url = url.split('/');

      if (url.length === 6 && url[url.length - 4] === 'admin-roles') {
        url = 'admin-roles';
      } else if (url[url.length - 1].startsWith('comments;')) {
        url = url[url.length - 2];
      } else if (
        url[url.length - 1].startsWith('retailer-') ||
        url[url.length - 1].startsWith('stockist-') ||
        url[url.length - 1].startsWith('super-stockist-') ||
        url[url.length - 1].startsWith('marketing-')
      ) {
        url = url[url.length - 1].split(';')[0];
      } else {
        url = url[url.length - 1];
      }

      const userAccessFeatureData = JSON.parse(
        localStorage.getItem('userAccessFeatureData')
      );

      if (userAccessFeatureData) {
        for (let i = 0; i < userAccessFeatureData.length; i++) {
          if (userAccessFeatureData[i].url === url) {
            featureId = userAccessFeatureData[i]._id;
            break;
          }
          if (
            userAccessFeatureData[i].children &&
            userAccessFeatureData[i].children.length > 0
          ) {
            for (let j = 0; j < userAccessFeatureData[i].children.length; j++) {
              if (userAccessFeatureData[i].children[j].url === url) {
                featureId = userAccessFeatureData[i].children[j]._id;
                break;
              }
            }
          }
        }
      }
    }

    // if (this.featureId === 'admin-dashboard') {
    //   const userData = JSON.parse(localStorage.getItem('currentUser'));
    //   if (userData.roles.indexOf('admin') >= 0) {
    //     const a = new BehaviorSubject('yes');
    //     return a;
    //   } else {
    //     const a = new BehaviorSubject('');
    //     return a;
    //   }
    // }

    const body = {
      featureId: this.featureId ? this.featureId : featureId,
      userId: this.baseService.getUserId()
    };

    return this.http.post('accessuserbyFeatureid', {}, body).pipe(
      map((response: any) => {
        return response.body.response;
      })
    );
  }

  // isMaster() {
  //   const req = {
  //     featureName: 'master edit',
  //     userId: this.baseService.getUserId()
  //   };

  //   return this.http.post('accessuserfeatures', {}, req).pipe(
  //     map((response: any) => {
  //       return response.body;
  //     })
  //   );
  // }
}
