import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToasterService } from '../services/toaster.service';

@Injectable()
export class UnAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private toasterService: ToasterService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authenticationService.accessFeatureByFeatureId().pipe(
      map(data => {
        if (data) {
          return true;
        } else {
          this.toasterService.showError(
            'You are not authorized to access this page'
          );
          return false;
          // this.router.navigate(['/']);
        }
      }),
      catchError(err => {
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}
