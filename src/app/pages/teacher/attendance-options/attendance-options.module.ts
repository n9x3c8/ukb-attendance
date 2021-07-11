import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { AttendanceOptionPage } from "./attendace-options.page";
import { AttendanceOptionsRoutingModule } from "./attendance-options-routing.module";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SharedService } from "src/app/shared/services/shared.service";
import { AttendanceService } from "src/app/shared/services/attendance.service";


@NgModule({
    declarations: [
        AttendanceOptionPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AttendanceOptionsRoutingModule
    ],
    providers: [
        Geolocation,
        SharedService,
        AttendanceService
    ]
})
export class AttendanceOptionsModule {}
