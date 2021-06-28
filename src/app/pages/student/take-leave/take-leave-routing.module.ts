import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakeLeavePage } from './take-leave.page';

const routes: Routes = [
    {
        path: '',
        component: TakeLeavePage
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TakeLeaveRoutingModule {}
