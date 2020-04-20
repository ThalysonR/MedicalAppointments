import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-doctor-card",
  templateUrl: "./doctor-card.component.html",
  styleUrls: ["./doctor-card.component.sass"],
})
export class DoctorCardComponent implements OnInit {
  @Input()
  doctor: DoctorModel;
  constructor() {}

  ngOnInit() {}
}
