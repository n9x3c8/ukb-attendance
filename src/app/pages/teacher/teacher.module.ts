import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavigationBottomModule } from 'src/app/components/navigation-bottom/navigation-bottom.module';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TeacherService } from 'src/app/shared/services/teacher.service';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';

@NgModule({
    declarations: [TeacherComponent],
    imports: [
        CommonModule,
        IonicModule,
        TeacherRoutingModule,
        NavigationBottomModule
    ],
    exports: [TeacherComponent],
    providers: [
        SharedService,
        TeacherService
    ]
})
export class TeacherModule {}
