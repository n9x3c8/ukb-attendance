import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HandmadeAttendancePage } from './handmade-attendance.page';

const routes: Routes = [
  {
    path: '',
    component: HandmadeAttendancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HandmadeAttendancePageRoutingModule {}
