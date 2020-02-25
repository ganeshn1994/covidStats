import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { MyBusinessComponent } from "./my-business.component";
import { MyBusinessRoutingModule } from "./my-business-routing.module";

@NgModule({
  declarations: [MyBusinessComponent],
  imports: [MyBusinessRoutingModule, SharedModule]
})
export class MyBusinessModule {}
