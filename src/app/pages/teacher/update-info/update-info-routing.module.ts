import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateInfoPage } from './update-info.page';

const routes: Routes = [
    {
        path: '',
        component: UpdateInfoPage
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class UpdateInfoRoutingModule {}
