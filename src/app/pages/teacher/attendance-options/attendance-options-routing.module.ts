import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AttendanceOptionPage } from "./attendace-options.page";

const routes: Routes = [
    {
        path: '',
        component: AttendanceOptionPage
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
export class AttendanceOptionsRoutingModule {}
