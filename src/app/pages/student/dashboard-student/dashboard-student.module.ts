import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DashboardStudentRoutingModule } from './dashboard-student-routing.module';

// services
import { StudentService } from '../../../shared/services/student.service';
import { AttendanceService } from '../../../shared/services/attendance.service';
import { SubjectService } from '../../../shared/services/subject.service';

import { DashboardStudentPage } from './dashboard-student.page';
import { StorageService } from 'src/app/shared/services/storage.service';

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
     StudentService,
     AttendanceService,
     SubjectService,
     StorageService
  ]
})
export class DashboardStudentModule {}
