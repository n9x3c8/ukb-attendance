import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StudentGuard } from "src/app/shared/guard/student.guard";
import { StudentComponent } from "./student.component";

const routes: Routes = [
    {
        path: '',
        component: StudentComponent,
        canActivate: [StudentGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard-student/dashboard-student.module').then(m => m.DashboardStudentModule)
            },
            {
                path: 'attendance-gps',
                loadChildren: () => import('./attendance-gps/attendance-gps.module').then(m => m.AttendanceGPSModule)
            },
            {
                path: 'notifications',
                loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule)
            },
            {
                path: 'take-leave',
                loadChildren: () => import('./take-leave/take-leave.module').then(m => m.TakeLeaveModule)
            },
            {
                path: 'update-profile',
                loadChildren: () => import('./update-profile/update-profile.module').then(m => m.UpdateProfileModule)
            },
            {
                path: 'statistical',
                loadChildren: () => import('./statistical/statistical.module').then(m => m.StatisticalModule)
            },
            {
                path: 'leave-application',
                loadChildren: () => import('./leave-application/leave-application.module').then(m => m.LeaveApplicationPageModule)
            },
            {
                path: 'q-and-a',
                loadChildren: () => import('./q-and-a/q-and-a.module').then( m => m.QAndAModule )
            }
        ]
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
export class StudentRoutingModule { }
