import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, BackgroundColorOptions } from '@capacitor/status-bar';


@Component({
  selector: 'attendance-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(IonRouterOutlet, { static : true }) routerOutlet: IonRouterOutlet;

  constructor(
    private platform: Platform,
    private alertCtrl: AlertController

  ) {
    this.initializeApp();
    this.backButton();
  }

  async ngOnInit() {
    this.statusBar();
  }

  private async statusBar() {
    let options: BackgroundColorOptions = {
      color: '#1976D2',
    };
    // await StatusBar.setBackgroundColor(options);
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      SplashScreen.hide();
    });
  }

  private backButton() {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if(!this.routerOutlet.canGoBack()) {
        this.presentAlertConfirm();
      }
    });
  }


  private async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Thông báo!',
      message: 'Message <strong>Bạn có muốn thoát ứng dụng không</strong>???',
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Đồng ý',
          handler: () => {
            App.exitApp();
          }
        }
      ]
    });
    await alert.present();
  }
}
