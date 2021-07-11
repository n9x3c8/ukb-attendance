import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../../../shared/services/storage.service';
import { SharedService } from '../../../shared/services/shared.service';
import { TeacherService } from '../../../shared/services/teacher.service';
import { DashboardTeacherRoutingModule } from './dashboard-teacher-routing.module';
import { DashboardTeacherPage } from './dashboard-teacher.page';
import { FormsModule } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account.service';
import { AttendanceService } from 'src/app/shared/services/attendance.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardTeacherRoutingModule,
  ],
  declarations: [
    DashboardTeacherPage
  ],
  providers: [
    AccountService,
    StorageService,
    AttendanceService,
    TeacherService,
    SharedService
  ]
})
export class DashboardTeacherModule {}
