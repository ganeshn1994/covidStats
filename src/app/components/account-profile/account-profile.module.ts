import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AccountProfileRoutingModule } from './account-profile-routing.module';
import { AccountProfileComponent } from './account-profile.component';

@NgModule({
  declarations: [AccountProfileComponent],
  imports: [AccountProfileRoutingModule, SharedModule]
})
export class AccountProfileModule {}
