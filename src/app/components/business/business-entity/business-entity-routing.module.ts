import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessEntityComponent } from './business-entity.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'deals',
    pathMatch: 'full'
  },
  {
    path: 'deals/:category',
    component: BusinessEntityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessEntityRoutingModule {}
