import { Routes, RouterModule } from '@angular/router';
import { AccountProfileComponent } from './account-profile.component';

const routes: Routes = [{ path: '', component: AccountProfileComponent }];

export const AccountProfileRoutingModule = RouterModule.forChild(routes);
