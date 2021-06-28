import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'attendance-qr-generator',
  templateUrl: './qr-generator.page.html',
  styleUrls: ['./qr-generator.page.scss'],
})
export class QrGeneratorPage implements OnInit {
  public level = NgxQrcodeErrorCorrectionLevels.LOW;
  public elementType = NgxQrcodeElementTypes.URL;
  public value = 'KTCT-06/06/2021';
  
  constructor() { }

  ngOnInit() {
  }


  public back() {
  }

}
