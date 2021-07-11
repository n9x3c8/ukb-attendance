import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { NavigationBottomModule } from "src/app/components/navigation-bottom/navigation-bottom.module";
import { StudentService } from "src/app/shared/services/student.service";
import { StudentRoutingModule } from "./student-routing.module";
import { StudentComponent } from "./student.component";


@NgModule({
    declarations: [StudentComponent],
    imports: [
        CommonModule,
        IonicModule,
        StudentRoutingModule,
        NavigationBottomModule
    ],
    exports: [
        StudentComponent
    ],
    providers: [
        StudentService
    ]
})
export class StudentModule {}
