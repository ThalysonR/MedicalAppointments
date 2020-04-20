import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DoctorService } from "src/app/services/doctor.service";

@Component({
  selector: "app-add-doctor",
  templateUrl: "./add-doctor.component.html",
  styleUrls: ["./add-doctor.component.sass"],
})
export class AddDoctorComponent implements OnInit {
  model: DoctorModel = {
    name: "",
    speciality: "",
  };
  @Output()
  OnSubmit: EventEmitter<any> = new EventEmitter();
  constructor(private doctorService: DoctorService) {}

  ngOnInit() {}

  submit() {
    this.doctorService.addDoctor(this.model).subscribe(() => {
      this.model = {
        name: "",
        speciality: "",
      };
      this.OnSubmit.emit();
    });
  }
}
