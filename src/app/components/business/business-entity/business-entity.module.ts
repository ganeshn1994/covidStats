import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessEntityRoutingModule } from './business-entity-routing.module';
import { BusinessEntityComponent } from './business-entity.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [BusinessEntityComponent],
  imports: [CommonModule, BusinessEntityRoutingModule, SharedModule]
})
export class BusinessEntityModule {}
