import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardTeacherPage } from './dashboard-teacher.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardTeacherPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardTeacherRoutingModule {}
