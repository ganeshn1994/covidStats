import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routes } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsServiceComponent } from './components/terms-service/terms-service.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { SnotifyModule, ToastDefaults, SnotifyService } from 'ng-snotify';
import { PipesModule } from './pipes';
import { AuthGuard } from './guards/AuthGuard';
import { UnAuthGuard } from './guards/unAuthGuard';
import { LoginGuard } from './guards/LoginGuard';
import { BnNgIdleService } from 'bn-ng-idle';
import { JwtInterceptor } from './interceptors/HttpInterceptor';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    LoadingComponent,
    PagenotfoundComponent,
    PrivacyPolicyComponent,
    TermsServiceComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, {}),
    HttpClientModule,
    SharedModule,
    PipesModule,
    BrowserAnimationsModule,
    SnotifyModule.forRoot(),
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    AuthGuard,
    UnAuthGuard,
    LoginGuard,
    BnNgIdleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
