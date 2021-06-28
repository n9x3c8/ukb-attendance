import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UpdateProfileRoutingModule } from './update-profile-routing.module';
import { UpdateProfilePage } from './update-profile.page';

@NgModule({
    declarations: [UpdateProfilePage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UpdateProfileRoutingModule
    ],
    exports: [UpdateProfilePage]
})
export class UpdateProfileModule {}

