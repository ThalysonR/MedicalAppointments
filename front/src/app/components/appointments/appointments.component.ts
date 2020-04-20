import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from "@angular/core";
import { AppointmentService } from "src/app/services/appointment.service";
import { CalendarView, CalendarEvent } from "angular-calendar";
import { isSameDay, isSameMonth } from "date-fns";
import { Subject, Subscription } from "rxjs";

const colors: any = {
  blue: {
    primary: "#ad2121",
    secondary: "#FAE3E3",
  },
};

@Component({
  selector: "app-appointments",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./appointments.component.html",
  styleUrls: ["./appointments.component.sass"],
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  appointments;
  activeDayIsOpen: boolean = false;
  refresh: Subject<any> = new Subject();

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.fetchAppointments();
    this.subscription = this.appointmentService.$appointmentAdded.subscribe(
      () => {
        this.fetchAppointments();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  fetchAppointments() {
    this.appointmentService.getAppointments().subscribe((appointments) => {
      this.events = [];
      appointments.forEach((appointment) => {
        const start = this.getDate(appointment.day);
        const end = this.getDate(appointment.day);
        start.setHours(appointment.hour, 0, 0, 0);
        end.setHours(appointment.hour + 1, 0, 0, 0);
        this.events.push({
          start,
          end,
          title: `${appointment.doctor.name} - ${appointment.doctor.speciality} - ${appointment.hour} hrs`,
        });
      });
      this.refresh.next();
    });
  }

  getDate(dateStr: string): Date {
    const dateArr = dateStr.split("/");
    const day = +dateArr[0];
    const month = +dateArr[1] - 1;
    const year = +dateArr[2];
    return new Date(year, month, day);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
