import {
  Component,
  ChangeDetectorRef,
  AfterViewInit,
  HostListener
} from "@angular/core";
import { LoaderService } from "./services/loader.service";
import { BnNgIdleService } from "bn-ng-idle";
import { AuthenticationService } from "./services/authentication/authentication.service";
import { BaseService } from "./services/base.service";
import { trigger, transition, useAnimation } from "@angular/animations";
import { bounce } from "ng-animate";

@Component({
  selector: "app-root",
  animations: [
    trigger("bounce", [
      transition(
        "* => *",
        useAnimation(bounce, {
          params: { timing: 2, delay: 0 }
        })
      )
    ])
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {
  bounce: any;
  isShow: boolean;
  loading: boolean;
  topPosToStartShowing: number = 100;

  @HostListener("window:scroll")
  checkScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  constructor(
    private loaderService: LoaderService,
    private authenticationService: AuthenticationService,
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
    this.bnIdle.startWatching(1000).subscribe(res => {
      if (res) {
        if (this.authenticationService.isLoggedIn()) {
          this.authenticationService.logout();
          window.location.reload();
        }
      }
    });
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
