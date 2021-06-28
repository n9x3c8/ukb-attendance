import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDetailComponent } from './view-detail.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
        ViewDetailComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        ViewDetailComponent
    ]
})
export class ViewDetailModule {}
