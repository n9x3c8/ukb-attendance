import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertController, IonRouterOutlet, Platform } from "@ionic/angular";
import { Subscription } from "rxjs";
import { App } from '@capacitor/app';
import { SharedService } from "src/app/shared/services/shared.service";
import { TeacherService } from "src/app/shared/services/teacher.service";
import { IStudentTakeLeave } from "src/app/shared/defined/student.define";

@Component({
    selector: 'attendance-teacher-comp',
    templateUrl: 'teacher.component.html',
    styleUrls: ['teacher.component.scss']
})
export class TeacherComponent implements OnInit, OnDestroy {
    public studentTakeLeave: IStudentTakeLeave[];
    public countNotify: number;
    public subscription: Subscription;

    @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;


    constructor(
        private platform: Platform,
        private alertCtrl: AlertController,
        private _activedRoute: ActivatedRoute,
        private _sharedService: SharedService,
        private _teacherService: TeacherService
    ) {
        this.backButton();
    }

    ngOnInit() {
        this.init();
        this.processParam();
        this.countNotifications();
    }

    private async init() {
        let currentTime: string = this._sharedService.getDatetime();
        let listStudent$ = await this._teacherService.listStudentTakeLeave(currentTime);
        this.subscription = listStudent$.subscribe((res: any) => {
            if (res.state === -403) {
                return;
            }
            this.studentTakeLeave = [...res];
        });
    }

    private async countNotifications() {
        let currentTime: string = this._sharedService.getDatetime();
        let listStudent$ = await this._teacherService.getCountNotifications(currentTime);
        this.subscription = listStudent$.subscribe((res: any) => {
            return this.countNotify = (+res?.count > 0) ? res?.count : undefined;
        });
    }

    private processParam() {
        this.subscription = this._activedRoute.queryParamMap
            .subscribe((param: any) => {
                let state: string = param.params.state;
                if (state) {
                    return this.countNotifications();
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
