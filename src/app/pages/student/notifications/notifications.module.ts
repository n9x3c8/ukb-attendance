import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NotificationsComponent } from './notifications.component';
import { ViewDetailModule } from 'src/app/components/view-detail/view-detail.module';
import { NavigationBottomModule } from 'src/app/components/navigation-bottom/navigation-bottom.module';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { CustomPipeModule } from 'src/app/shared/pipe/custom-pipe.module';
import { NoDataModule } from 'src/app/components/no-data/no-data.module';
@NgModule({
    declarations: [
        NotificationsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        IonicModule,
        ViewDetailModule,
        NavigationBottomModule,
        NotificationsRoutingModule,
        CustomPipeModule,
        NoDataModule
    ],
    exports: [
        NotificationsComponent
    ]
    
})
export class NotificationsModule {}