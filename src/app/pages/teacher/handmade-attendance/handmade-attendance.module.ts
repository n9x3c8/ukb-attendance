import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { HandmadeAttendancePageRoutingModule } from './handmade-attendance-routing.module';

import { HandmadeAttendancePage } from './handmade-attendance.page';
import { AttendanceService } from 'src/app/shared/services/attendance.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HandmadeAttendancePageRoutingModule
  ],
  declarations: [HandmadeAttendancePage],
  providers: [
    AttendanceService,
    SharedService
  ]
})
export class HandmadeAttendancePageModule {}
