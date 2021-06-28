import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewDetailComponent } from "./view-detail.component";

const routes: Routes = [
    {
        path: '',
        component: ViewDetailComponent
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
export class ViewDetailRoutingModule {}