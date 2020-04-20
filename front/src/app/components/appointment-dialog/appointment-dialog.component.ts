import { Component, OnInit, Inject } from "@angular/core";
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Moment } from "moment";
import { AppointmentService } from "src/app/services/appointment.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-appointment-dialog",
  templateUrl: "./appointment-dialog.component.html",
  styleUrls: ["./appointment-dialog.component.sass"],
})
export class AppointmentDialogComponent implements OnInit {
  model: {
    date: Moment;
    selectedHour: number;
  } = {
    date: null,
    selectedHour: null,
  };
  hours = [];
  minDate: Date = new Date();
  constructor(
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    private _snackBar: MatSnackBar,
    private appointmentService: AppointmentService,
    @Inject(MAT_DIALOG_DATA) public doctor: DoctorModel
  ) {}

  ngOnInit() {
    for (let i = 7; i < 18; i++) {
      this.hours.push(i);
    }
  }

  scheduleAppointment() {
    this.appointmentService
      .scheduleAppointment(
        this.model.date.format("L"),
        this.model.selectedHour,
        this.doctor
      )
      .pipe(finalize(() => this.dialogRef.close()))
      .subscribe(
        () => {
          this._snackBar.open("Appointment scheduled successfully", "", {
            panelClass: ["snack-success"],
          });
        },
        () => {
          this._snackBar.open("Failure during scheduling process", "", {
            panelClass: ["snack-danger"],
          });
        }
      );
  }
}
