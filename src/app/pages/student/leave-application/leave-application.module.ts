import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LeaveApplicationPageRoutingModule } from './leave-application-routing.module';
import { LeaveApplicationPage } from './leave-application.page';
import { FormUpdateComponent } from './form-update/form-update.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaveApplicationPageRoutingModule
  ],
  declarations: [
    LeaveApplicationPage,
    FormUpdateComponent
  ]
})
export class LeaveApplicationPageModule {}
