import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TeacherService } from 'src/app/shared/services/teacher.service';

import { UpdateInfoRoutingModule } from './update-info-routing.module';
import { UpdateInfoPage } from './update-info.page';

@NgModule({
    declarations: [UpdateInfoPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UpdateInfoRoutingModule
    ],
    exports: [UpdateInfoPage],
    providers: [TeacherService]
})
export class UpdateInfoModule {}
