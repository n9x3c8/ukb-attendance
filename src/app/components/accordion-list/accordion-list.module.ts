import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AccordionListComponent } from './accordion-list.component';

@NgModule({
    declarations: [AccordionListComponent],
    imports: [
        CommonModule,
        RouterModule,
        IonicModule
    ],
    exports: [AccordionListComponent]
})
export class AccordionListModule {}