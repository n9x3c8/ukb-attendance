import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { IonRouterOutlet, Platform, ToastController, ViewDidEnter, ViewWillLeave } from '@ionic/angular';
import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, BackgroundColorOptions } from '@capacitor/status-bar';


@Component({
  selector: 'attendance-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, ViewDidEnter, ViewWillLeave {
  private countExit: number = 0;

  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;

  constructor(
    private platform: Platform,
    private _location: Location,
    private storage: Storage,
    private _toast: ToastController
  ) {
    this.initializeApp();
    this.backButton();
  }

  async ngOnInit() {
    this.statusBar();
    await this.storage.create();
  }

  ionViewDidEnter() {
    // navigator['app'].clearHistory();
  }

  ionViewWillLeave() {
    this.platform.backButton.unsubscribe();
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      SplashScreen.hide();
    });
  }

  private async statusBar() {
    let options: BackgroundColorOptions = {
      color: '#1976D2',
    };
    await StatusBar.setBackgroundColor(options);
  }

  

  private backButton() {
    this.platform.backButton.subscribeWithPriority(-1, processNextHandler => {
      let VALID_PATH = this._location.isCurrentPathEqualTo('/teacher/dashboard') || this._location.isCurrentPathEqualTo('/student/dashboard');
      if(VALID_PATH) {
        this.countExit++;
        if(this.countExit === 1) {
          this.showToast('Ấn quay lại lần nữa để thoát ứng dụng', 'light', 2500);
          setTimeout(() => {
            this.countExit = 0;
          }, 3000);
          processNextHandler();
        }
        if(this.countExit === 2) {
          App.exitApp();
        }
        return;
      }
      this._location.back();
    });
  }   

  private async showToast(message: string, color?: string, duration?: number) {
    const toast = await this._toast.create({
      message,
      duration,
      color,
      mode: 'ios'
    })
    return await toast.present();
  }
}
