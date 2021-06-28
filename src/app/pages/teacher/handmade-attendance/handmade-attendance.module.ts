import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { HandmadeAttendancePageRoutingModule } from './handmade-attendance-routing.module';

import { HandmadeAttendancePage } from './handmade-attendance.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HandmadeAttendancePageRoutingModule
  ],
  declarations: [HandmadeAttendancePage]
})
export class HandmadeAttendancePageModule {}
