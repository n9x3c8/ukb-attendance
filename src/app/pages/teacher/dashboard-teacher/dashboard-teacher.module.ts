import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../../../shared/services/storage.service';
import { SharedService } from '../../../shared/services/shared.service';
import { TeacherService } from '../../../shared/services/teacher.service';
import { DashboardTeacherRoutingModule } from './dashboard-teacher-routing.module';
import { DashboardTeacherPage } from './dashboard-teacher.page';
import { FormsModule } from '@angular/forms';

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
    StorageService,
    TeacherService,
    SharedService
  ]
})
export class DashboardTeacherModule {}
