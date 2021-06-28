import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ListStudentTakeLeavePage } from './list-student-take-leave.page';
import { ListStudentTakeLeaveRoutingModule } from './list-student-take-leave-routing.module';
import { FormDeninePage } from './form-denine/form-denine.page';
import { CustomPipeModule } from 'src/app/shared/pipe/custom-pipe.module';
import { ViewDetailModule } from 'src/app/components/view-detail/view-detail.module';
import { NoDataModule } from 'src/app/components/no-data/no-data.module';
@NgModule({
    declarations: [
        ListStudentTakeLeavePage,
        FormDeninePage
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListStudentTakeLeaveRoutingModule,
        ViewDetailModule,
        CustomPipeModule,
        NoDataModule
    ],
    exports: [ListStudentTakeLeavePage]
})
export class ListStudentTakeLeaveModule {}