import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { AccordionListModule } from "src/app/components/accordion-list/accordion-list.module";
import { QAndAPageRoutingModule } from "./q-and-a-routing.module";
import { QAndAPage } from "./q-and-a.page";

@NgModule({
    declarations: [QAndAPage],
    imports: [
        CommonModule,
        IonicModule,
        QAndAPageRoutingModule,
        AccordionListModule
    ]
})
export class QAndAModule {}
