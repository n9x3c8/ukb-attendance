import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DashboardStudentRoutingModule } from './dashboard-student-routing.module';

import { StudentService } from '../../../shared/services/student.service';
import { AttendanceService } from '../../../shared/services/attendance.service';
import { SubjectService } from '../../../shared/services/subject.service';

import { DashboardStudentPage } from './dashboard-student.page';
import { AccountService } from 'src/app/shared/services/account.service';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DashboardStudentRoutingModule
  ],
  declarations: [
    DashboardStudentPage,
  ],
   providers: [
    AccountService,
     StudentService,
     AttendanceService,
     SubjectService
  ]
})
export class DashboardStudentModule {}
