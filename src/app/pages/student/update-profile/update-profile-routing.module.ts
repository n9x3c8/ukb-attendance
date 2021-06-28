import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentGuard } from 'src/app/shared/guard/student.guard';
import { UpdateProfilePage } from './update-profile.page';

const routes: Routes = [
    {
        path: '',
        component: UpdateProfilePage,
        canActivate: [StudentGuard]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class UpdateProfileRoutingModule{}