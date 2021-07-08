import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertController, IonRouterOutlet, Platform } from "@ionic/angular";
import { Subscription } from "rxjs";
import { App } from '@capacitor/app';
import { Inofification } from "src/app/shared/defined/notification.define";
import { StudentService } from "src/app/shared/services/student.service";

@Component({
    selector: 'attendance-student',
    templateUrl: 'student.component.html',
    styleUrls: ['student.component.scss']
})
export class StudentComponent implements OnInit, OnDestroy {
    public notifications: Inofification[] = [];
    public subscription: Subscription;
    public count: number = 0;

    @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;

    
    constructor(
        private platform: Platform,
        private alertCtrl: AlertController,
        private _activedRoute: ActivatedRoute,
        private _studentService: StudentService
    ) { }

    ngOnInit() {
        this.onHandleGetNotifications();
        this.init();
    }

    public async onHandleGetNotifications() {
        let notify$ = await this._studentService.notifications();
        notify$.subscribe((res: Inofification[]) => {
            if (res) {
                this.notifications = res.filter((notification: any) => {
                    return notification?.is_seen == 0;
                });
                return;
            }
            return this.notifications = [];
        });

    }

    private init() {
        this.subscription = this._activedRoute.queryParamMap
        .subscribe((param: any) => {
            let state: string = param.params.state;
            if(state !== undefined) {
                this.notifications.shift();
            }
            return;
        })
    }


    private backButton() {
        this.platform.backButton.subscribeWithPriority(-1, () => {
            if (!this.routerOutlet.canGoBack()) {
                this.presentAlertConfirm();
            }
        });
    }

    private async presentAlertConfirm() {
        const alert = await this.alertCtrl.create({
            header: 'Thông báo!',
            message: 'Message <strong>Thầy/Cô có muốn thoát ứng dụng không</strong>???',
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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}