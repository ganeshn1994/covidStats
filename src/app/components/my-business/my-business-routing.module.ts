import { Routes, RouterModule } from '@angular/router';
import { MyBusinessComponent } from './my-business.component';

const routes: Routes = [{ path: '', component: MyBusinessComponent }];

export const MyBusinessRoutingModule = RouterModule.forChild(routes);
