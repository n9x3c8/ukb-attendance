import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QAndAPage } from './q-and-a.page';

const routes: Routes = [
  {
    path: '',
    component: QAndAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QAndAPageRoutingModule {}
