import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { NgModule } from '@angular/core';
import { StatsDashboardComponent } from './components/stats-dashboard/stats-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: StatsDashboardComponent
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
