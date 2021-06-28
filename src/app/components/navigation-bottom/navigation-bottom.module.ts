import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NavigationBottomComponent } from './navigation.component';

@NgModule({
    declarations: [NavigationBottomComponent],
    imports: [
        CommonModule,
        RouterModule,
        IonicModule
    ],
    exports: [NavigationBottomComponent]
})
export class NavigationBottomModule {}