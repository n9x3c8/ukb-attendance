import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStudentTakeLeavePage } from './list-student-take-leave.page';

const routes: Routes = [
    {
        path: '',
        component: ListStudentTakeLeavePage,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ListStudentTakeLeaveRoutingModule {}
