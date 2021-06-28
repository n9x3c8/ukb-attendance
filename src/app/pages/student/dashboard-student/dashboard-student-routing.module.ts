import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardStudentPage } from './dashboard-student.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardStudentRoutingModule {}
