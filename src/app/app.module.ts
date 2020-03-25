import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routes } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { SnotifyModule, ToastDefaults, SnotifyService } from 'ng-snotify';
import { PipesModule } from './pipes';
import { BnNgIdleService } from 'bn-ng-idle';
import { StatsDashboardComponent } from './components/stats-dashboard/stats-dashboard.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoadingComponent,
    StatsDashboardComponent,
    PagenotfoundComponent
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
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBB_lDYJjs5vkL4kaHI-LCGHm_zwa3nkHg'
    })
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    BnNgIdleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
