import { Component, OnInit } from "@angular/core";
import { AuthProcessService } from "ngx-auth-firebaseui";
import { Router } from "@angular/router";

@Component({
  selector: "app-loggedout",
  templateUrl: "./loggedout.component.html",
  styleUrls: ["./loggedout.component.sass"],
})
export class LoggedoutComponent implements OnInit {
  constructor(
    private authProcess: AuthProcessService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authProcess.afa.user.subscribe((user) => {
      if (user) this.goToHome();
    });
  }

  goToHome() {
    this.router.navigate(["/"]);
  }
}
