import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/AuthGuard';
import { LoginGuard } from './guards/LoginGuard';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsServiceComponent } from './components/terms-service/terms-service.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { NgModule } from '@angular/core';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BusinessGuard } from './guards/business.guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [BusinessGuard]
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'verify',
    loadChildren: () =>
      import('./components/login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'validateUserOTP',
    loadChildren: () =>
      import('./components/register/register.module').then(
        m => m.RegisterModule
      ),
    canActivate: [LoginGuard]
  },
  {
    path: 'editPhoneNumber',
    loadChildren: () =>
      import('./components/login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'editMobileNumber',
    loadChildren: () =>
      import('./components/register/register.module').then(
        m => m.RegisterModule
      ),
    canActivate: [LoginGuard]
  },
  {
    path: 'setPassword',
    loadChildren: () =>
      import('./components/set-password/set-password.module').then(
        m => m.SetPasswordModule
      ),
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./components/register/register.module').then(
        m => m.RegisterModule
      ),
    canActivate: [LoginGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./components/forgot-password/forgot-password.module').then(
        m => m.ForgotPasswordModule
      ),
    canActivate: [LoginGuard]
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./components/account-profile/account-profile.module').then(
        m => m.AccountProfileModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'mybusiness',
    loadChildren: () =>
      import('./components/my-business/my-business.module').then(
        m => m.MyBusinessModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'stockist',
    loadChildren: () =>
      import(
        './components/business/business-entity/business-entity.module'
      ).then(m => m.BusinessEntityModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'super-stockist',
    loadChildren: () =>
      import(
        './components/business/business-entity/business-entity.module'
      ).then(m => m.BusinessEntityModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'marketing-company',
    loadChildren: () =>
      import(
        './components/business/business-entity/business-entity.module'
      ).then(m => m.BusinessEntityModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'retailer',
    loadChildren: () =>
      import(
        './components/business/business-entity/business-entity.module'
      ).then(m => m.BusinessEntityModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'super-stockist/home/:businessId',
    component: LandingPageComponent,
    canActivate: [BusinessGuard]
  },
  {
    path: 'stockist/home/:businessId',
    component: LandingPageComponent,
    canActivate: [BusinessGuard]
  },
  {
    path: 'retailer/home/:businessId',
    component: LandingPageComponent,
    canActivate: [BusinessGuard]
  },
  {
    path: 'marketing-company/home/:businessId',
    component: LandingPageComponent,
    canActivate: [BusinessGuard]
  },
  {
    path: 'privacyPolicy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'termsOfService',
    component: TermsServiceComponent
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
