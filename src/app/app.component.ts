import {
  Component,
  ChangeDetectorRef,
  AfterViewInit,
  HostListener
} from "@angular/core";
import { LoaderService } from "./services/loader.service";
import { BnNgIdleService } from "bn-ng-idle";
import { BaseService } from './services';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {
  bounce: any;
  isShow: boolean;
  loading: boolean;

  constructor(
    private loaderService: LoaderService,
    private cd: ChangeDetectorRef,
    private bnIdle: BnNgIdleService,
    private baseService: BaseService
  ) {
    console.log(".+@@@@@+        #@@@@");
    console.log(" .@@ @@@=      #*@@@@");
    console.log("  @ +@@@@-   =# @@@@@");
    console.log("  @  +@@@@: :%  @@@@@");
    console.log("  @   *@@@@-%:  @@@@@");
    console.log("  @    *@@@@-   @@@@@");
    console.log(" -@-    #@@+   :@@@@@:");
    console.log("-#@@#-        =@@@@@@@=");
    console.log(".......      .........");
  }

  ngAfterViewInit() {
    this.loaderService.loading.subscribe(value => {
      this.loading = value;
      this.cd.detectChanges();
    });
  }

  scrollToTop() {
    this.baseService.gotoTop();
  }
}
