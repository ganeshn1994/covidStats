import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class BusinessGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthenticationService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('selectedBusiness') !== null) {
      return true;
    } else {
      if (this.auth.isLoggedIn()) {
        this.router.navigate(['/mybusiness']);
      } else {
        this.router.navigate(['/']);
      }
      return false;
    }
  }
}
