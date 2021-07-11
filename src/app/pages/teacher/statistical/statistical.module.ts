import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StatisticalRoutingModule } from './statistical-routing.module';
import { StatisticalPage } from './statistical.page';
import { ConvertMonthToSemesterPipe } from '../../../shared/pipe/convert-month-to-semester.pipe';
import { TeacherService } from 'src/app/shared/services/teacher.service';
import { SharedService } from 'src/app/shared/services/shared.service';
@NgModule({
    declarations: [
        StatisticalPage,
        ConvertMonthToSemesterPipe
    ],
    imports: [
        CommonModule,
        IonicModule,
        StatisticalRoutingModule
    ],
    exports: [StatisticalPage],
    providers: [
        TeacherService,
        SharedService
    ]
})
export class StatisticalModule {}