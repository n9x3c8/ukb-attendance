import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherGuard } from 'src/app/shared/guard/teacher.guard';
import { ListStudentInRoomPage } from './list-student-in-room.page';

const routes: Routes = [
    {
        path: '',
        component: ListStudentInRoomPage,
        canActivate: [TeacherGuard]
    },
   
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ListStudentInRoomRouting {}
