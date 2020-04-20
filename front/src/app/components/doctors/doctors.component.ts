import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DoctorService } from "src/app/services/doctor.service";
import { MatDialog } from "@angular/material";
import { AppointmentDialogComponent } from "../appointment-dialog/appointment-dialog.component";
import { Subscription } from "rxjs";

@Component({
  selector: "app-doctors",
  templateUrl: "./doctors.component.html",
  styleUrls: ["./doctors.component.sass"],
})
export class DoctorsComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = [];
  doctors: Array<DoctorModel> = [];
  filteredDoctors: Array<DoctorModel> = [];
  search: FormControl = new FormControl("");
  constructor(
    private doctorService: DoctorService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.search.valueChanges.subscribe((value) => {
        value != ""
          ? (this.filteredDoctors = this.doctors.filter((doctor) =>
              doctor.name.toLowerCase().includes(value.toLowerCase())
            ))
          : (this.filteredDoctors = this.doctors.slice());
      })
    );
    this.fetchDoctors();
    this.subscriptions.push(
      this.doctorService.$doctorAdded.subscribe(() => {
        this.fetchDoctors();
      })
    );
  }

  ngOnDestroy() {}

  fetchDoctors() {
    this.doctorService.getAllDoctors().subscribe((doctors) => {
      this.doctors = doctors;
      this.filteredDoctors = doctors;
    });
  }

  appointmentDialog(doctor: DoctorModel) {
    this.dialog.open(AppointmentDialogComponent, {
      width: "350px",
      data: doctor,
    });
  }
}
