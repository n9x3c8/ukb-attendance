import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ListStudentInRoomPage } from './list-student-in-room.page';
import { ListStudentInRoomRouting } from './list-student-in-room-routing.module';

@NgModule({
    declarations: [
        ListStudentInRoomPage
    ],
    imports: [
        CommonModule,
        IonicModule,
        ListStudentInRoomRouting
    ],
    exports: [ListStudentInRoomPage]
})
export class ListStudentInRoomModule {}