import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { QrGeneratorPageRoutingModule } from './qr-generator-routing.module';
import { QrGeneratorPage } from './qr-generator.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NgxQRCodeModule,
    QrGeneratorPageRoutingModule
  ],
  declarations: [QrGeneratorPage]
})
export class QrGeneratorPageModule {}
