import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AttendanceGPSPage } from "./attendance-gps.page";

const routes: Routes = [
    {
        path: '',
        component: AttendanceGPSPage
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AttendanceGPSRoutingModule {}
