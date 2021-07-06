import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

import { WarningDirective } from 'src/app/shared/directives/warning.directive';
import { ViewDetailRoutingModule } from './view-detail-routing.module';

import { ViewDetailComponent } from './view-detail.component';
import { PrintComponent } from '../print/print.component';
@NgModule({
    declarations: [
        ViewDetailComponent,
        PrintComponent,
        WarningDirective
    ],
    imports: [
        CommonModule,
        IonicModule,
        ViewDetailRoutingModule
    ],
    providers: [PDFGenerator],
    exports: [
        ViewDetailComponent
    ]
})
export class ViewDetailModule {}