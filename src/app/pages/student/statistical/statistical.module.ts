import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StatisticalRoutingModule } from './statistical-routing.module';
import { StatisticalPage } from './statistical.page';

@NgModule({
    declarations: [
        StatisticalPage
    ],
    imports: [
        CommonModule,
        IonicModule,
        StatisticalRoutingModule
    ],
    exports: [
        StatisticalPage
    ]
})
export class StatisticalModule {}
