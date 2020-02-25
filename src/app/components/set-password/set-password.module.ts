import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetPasswordRoutingModule } from './set-password-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SetPasswordComponent } from './set-password.component';

@NgModule({
  declarations: [SetPasswordComponent],
  imports: [CommonModule, SetPasswordRoutingModule, SharedModule]
})
export class SetPasswordModule {}
