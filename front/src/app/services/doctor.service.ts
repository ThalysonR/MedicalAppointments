import { Injectable } from "@angular/core";
import { AuthProcessService } from "ngx-auth-firebaseui";
import { Observable, of, Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { flatMap, map, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DoctorService {
  constructor(
    private authService: AuthProcessService,
    private http: HttpClient
  ) {}

  private doctorAdded: Subject<void> = new Subject();
  public $doctorAdded: Observable<void> = this.doctorAdded.asObservable();

  getAllDoctors(): Observable<Array<DoctorModel>> {
    return this.authService.afa.idToken.pipe(
      flatMap((token) =>
        this.http.get(`${environment.apiUrl}/doctor`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ),
      map((res) => res["items"])
    );
  }

  addDoctor(doctor: DoctorModel): Observable<any> {
    return this.authService.afa.idToken.pipe(
      flatMap((token) =>
        this.http.post(`${environment.apiUrl}/doctor`, doctor, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ),
      tap(() => {
        this.doctorAdded.next();
      })
    );
  }
}
