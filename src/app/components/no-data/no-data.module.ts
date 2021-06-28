import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { NoDataComponent } from "./no-data.component";

@NgModule({
    declarations: [
        NoDataComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        NoDataComponent
    ]
})
export class NoDataModule {}