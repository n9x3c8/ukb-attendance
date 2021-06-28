import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TakeLeaveRoutingModule } from './take-leave-routing.module';
import { TakeLeavePage } from './take-leave.page';

@NgModule({
    declarations: [TakeLeavePage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TakeLeaveRoutingModule
    ],
    exports: [TakeLeavePage]
})
export class TakeLeaveModule {}
