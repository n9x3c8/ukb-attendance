import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ListStudentInRoomPage } from './list-student-in-room.page';
import { ListStudentInRoomRouting } from './list-student-in-room-routing.module';
import { AttendanceService } from 'src/app/shared/services/attendance.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TeacherService } from 'src/app/shared/services/teacher.service';

@NgModule({
    declarations: [
        ListStudentInRoomPage
    ],
    imports: [
        CommonModule,
        IonicModule,
        ListStudentInRoomRouting
    ],
    exports: [ListStudentInRoomPage],
    providers: [
        AttendanceService,
        SharedService,
        TeacherService
    ]
})
export class ListStudentInRoomModule {}