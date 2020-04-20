import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import pt from "@angular/common/locales/pt";
import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from "./components/header/header.component";

import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from "@angular/material/snack-bar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatSelectModule } from "@angular/material/select";
import { MatGridListModule } from "@angular/material/grid-list";
import { NgxAuthFirebaseUIModule } from "ngx-auth-firebaseui";
import { LoggedoutComponent } from "./pages/loggedout/loggedout.component";
import { HomeComponent } from "./pages/home/home.component";
import { RoutePaths } from "./routes";
import { DoctorsComponent } from "./components/doctors/doctors.component";
import { DoctorCardComponent } from "./components/doctor-card/doctor-card.component";
import { AppointmentDialogComponent } from "./components/appointment-dialog/appointment-dialog.component";
import { AddDoctorComponent } from "./components/add-doctor/add-doctor.component";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { AppointmentsComponent } from "./components/appointments/appointments.component";

registerLocaleData(pt, "pt");

export function appName() {
  return "Medical_Appointments";
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoggedoutComponent,
    HomeComponent,
    DoctorsComponent,
    DoctorCardComponent,
    AppointmentDialogComponent,
    AddDoctorComponent,
    AppointmentsComponent,
  ],
  imports: [
    NgxAuthFirebaseUIModule.forRoot(environment.firebase, appName, {
      enableFirestoreSync: false,
      toastMessageOnAuthSuccess: true,
      toastMessageOnAuthError: true,
      enableEmailVerification: true,
      authGuardFallbackURL: RoutePaths.LoggedOut,
      authGuardLoggedInURL: RoutePaths.Home,
      guardProtectedRoutesUntilEmailIsVerified: true,
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt-BR" },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
  bootstrap: [AppComponent],
  entryComponents: [AppointmentDialogComponent],
})
export class AppModule {}
