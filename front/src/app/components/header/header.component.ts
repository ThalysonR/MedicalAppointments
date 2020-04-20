import { Component, OnInit } from "@angular/core";
import { RoutePaths } from "../../routes";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"],
})
export class HeaderComponent implements OnInit {
  routePaths = RoutePaths;

  constructor(private router: Router) {}

  ngOnInit() {}

  SignOut() {
    this.router.navigate(["/loggedout"]);
  }
}
