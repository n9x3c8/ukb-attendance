import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { AttendanceGPSPage } from "./attendance-gps.page";
import { AttendanceGPSRoutingModule } from './attendance-gps-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
    declarations: [
        AttendanceGPSPage
    ],
    imports: [
        CommonModule,
        IonicModule,
        AttendanceGPSRoutingModule
    ],
    providers: [Geolocation]
})
export class AttendanceGPSModule {}