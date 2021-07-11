import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AttendanceService } from 'src/app/shared/services/attendance.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { TakeLeaveRoutingModule } from './take-leave-routing.module';
import { TakeLeavePage } from './take-leave.page';

@NgModule({
    declarations: [TakeLeavePage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TakeLeaveRoutingModule
    ],
    providers: [
        SharedService,
        StudentService,
        SubjectService,
        AttendanceService
    ],
    exports: [TakeLeavePage]
})
export class TakeLeaveModule {}
