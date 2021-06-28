import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ViewDetailRoutingModule } from './view-detail-routing.module';

import { ViewDetailComponent } from './view-detail.component';
import { PrintComponent } from '../print/print.component';
@NgModule({
    declarations: [
        ViewDetailComponent,
        PrintComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        ViewDetailRoutingModule
    ],
    exports: [
        ViewDetailComponent
    ]
})
export class ViewDetailModule {}