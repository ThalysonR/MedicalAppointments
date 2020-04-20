import { Injectable } from "@angular/core";
import { AuthProcessService } from "ngx-auth-firebaseui";
import { Observable, of, Subject } from "rxjs";
import { flatMap, map, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AppointmentService {
  constructor(private auth: AuthProcessService, private http: HttpClient) {}

  private appointmentAdded: Subject<void> = new Subject();
  public $appointmentAdded: Observable<
    void
  > = this.appointmentAdded.asObservable();

  scheduleAppointment(
    day: string,
    hour: number,
    doctor: DoctorModel
  ): Observable<any> {
    return this.auth.afa.idToken.pipe(
      flatMap((token) =>
        this.http.post(
          `${environment.apiUrl}/appointments`,
          { day, hour, doctor },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      ),
      tap(() => this.appointmentAdded.next())
    );
  }

  getAppointments(): Observable<Array<AppointmentModel>> {
    return <Observable<Array<AppointmentModel>>>this.auth.afa.idToken.pipe(
      flatMap((token) =>
        this.http.get(`${environment.apiUrl}/appointments`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ),
      map((res) => res["items"])
    );
  }
}
