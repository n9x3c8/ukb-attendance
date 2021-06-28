import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticalPage } from './statistical.page';

const routes: Routes = [
    {
        path: '',
        component: StatisticalPage
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
export class StatisticalRoutingModule {}