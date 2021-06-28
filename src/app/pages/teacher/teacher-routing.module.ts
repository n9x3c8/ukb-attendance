import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherGuard } from 'src/app/shared/guard/teacher.guard';
import { TeacherComponent } from './teacher.component';

const routes: Routes = [
    {
        path: '',
        component: TeacherComponent,
        canActivate: [TeacherGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard-teacher/dashboard-teacher.module').then( m => m.DashboardTeacherModule ),
            },
            {
                path: 'attendance-options',
                loadChildren: () => import('./attendance-options/attendance-options.module').then( m => m.AttendanceOptionsModule )
            },
            {
                path: 'notifications',
                loadChildren: () => import('./list-student-take-leave/list-student-take-leave.module').then( m => m.ListStudentTakeLeaveModule ),
            },
            {
                path: 'list-student-in-room',
                loadChildren: () => import('./list-student-in-room/list-student-in-room.module').then( m => m.ListStudentInRoomModule ),
                children: [
                    {
                        path: ':atIdLast/:subjectId',
                        loadChildren: () => import('./list-student-in-room/list-student-in-room.module').then( m => m.ListStudentInRoomModule ),
                    }
                ]
            },
            {
                path: 'statistical',
                loadChildren: () => import('./statistical/statistical.module').then( m => m.StatisticalModule )
            },
            {
                path: 'view-detail-statistical/:classId/:subjectId/:totalSession',

                loadChildren: () => import('./statistical/view-detail/view-detail.module').then( m => m.ViewDetailModule )
            },
            {
                path: 'update-profile',
                loadChildren: () => import('./update-info/update-info.module').then( m => m.UpdateInfoModule )
            },
            {
                path: 'handmade-at',
                loadChildren: () => import('./handmade-attendance/handmade-attendance.module').then(  m => m.HandmadeAttendancePageModule),
                children: [
                    {
                        path: ":atIdLast",
                        loadChildren: () => import('./handmade-attendance/handmade-attendance.module').then(  m => m.HandmadeAttendancePageModule)
                    }
                ]
            },
            {
                path: 'q-and-a',
                loadChildren: () => import('./q-and-a/q-and-a.module').then( m => m.QAndAModule )
            },
            {
                path: 'qr-generator',
                loadChildren: () => import('./qr-generator/qr-generator.module').then( m => m.QrGeneratorPageModule )
            }
        ]
    },
  {
    path: 'qr-generator',
    loadChildren: () => import('./qr-generator/qr-generator.module').then( m => m.QrGeneratorPageModule)
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
export class TeacherRoutingModule {}