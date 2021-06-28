import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavigationBottomModule } from 'src/app/components/navigation-bottom/navigation-bottom.module';
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
    exports: [TeacherComponent]
})
export class TeacherModule {}
