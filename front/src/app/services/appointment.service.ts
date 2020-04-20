import { Injectable } from "@angular/core";
import { AuthProcessService } from "ngx-auth-firebaseui";
import { Observable, of } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AppointmentService {
  constructor(private auth: AuthProcessService, private http: HttpClient) {}
  appointments = [];
  scheduleAppointment(
    date: string,
    hour: number,
    doctor: DoctorModel
  ): Observable<any> {
    return this.auth.afa.idToken.pipe(
      flatMap((token) =>
        this.http.post(
          `${environment.apiUrl}/appointments`,
          { date, hour, doctor },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      )
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
