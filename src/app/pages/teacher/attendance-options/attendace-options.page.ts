import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { AlertController, IonButton, ViewDidEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation/ngx';
import { LocalNotifications } from '@capacitor/local-notifications';
import { SharedService } from '../../../shared/services/shared.service';
import { IinfoStateAT } from 'src/app/shared/defined/info.define';
import { AttendanceService } from 'src/app/shared/services/attendance.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'attendance-attendance-options',
    templateUrl: 'attendance-options.page.html',
    styleUrls: ['attendance-options.page.scss']
})
export class AttendanceOptionPage implements ViewDidEnter, OnDestroy {
    public class: Class[];
    public selectedClass: string;

    public subjects: Subject[];
    public selectedSubject: string;

    public radius: number = 5;

    public isEnableSelectSubject: boolean;
    public isEnableAttendance: boolean;
    public validEmptyTakeLeave: number;
    public validHandMadeAT: number;

    public subscription: Subscription;

    public info: IinfoStateAT;

    public atIdLast: number;

    @ViewChild('btnAttendance') btnAttendance: IonButton;
    @ViewChild('txtAttendance') txtAttendance: ElementRef<HTMLElement>;

    constructor(
        private _router: Router,
        private _geolocation: Geolocation,
        private _activedRoute: ActivatedRoute,
        private _alertCtrl: AlertController,
        private _sharedService: SharedService,
        private _attendanceService: AttendanceService
    ) {
        this.validEmptyTakeLeave = 0;
        this.validHandMadeAT = 0;
    }

    async ionViewDidEnter() {
        await this.getInfoStateAT();
        this.subscription = this._activedRoute.queryParamMap.subscribe((param: any) => {
            const { atIdLast } = param.params;
            this.atIdLast = +atIdLast;
        })
    }

    private async getInfoStateAT() {
        let currentTime: string = this._sharedService.getDatetime();
        let info$ = await this._attendanceService.getInfoStateAttendance(currentTime);
        this.subscription = info$.subscribe((res: IinfoStateAT) => {
            this.info = { ...res };
            this.initializeStateAT(+this.info?.count_number_session);
            let classId: string = this.info.infoClass.class_id;
            let subjectName: string = this.info.infoSubject.subject_name;
            this.radius = this.info.radius;
            if (!classId) {
                this.getClassByTeacher();
            }
            this.selectedClass = classId;
            this.selectedSubject = subjectName;
        });
    }

    private async initializeStateAT(count: number) {
        // 1 bat diem danh | 2 tat diem danh
        let timeserver: number = this.info?.timeserver;
        this._attendanceService.stateAttendance(count, this.info, timeserver).then((res: any) => {

            if (res.state === 1) {
                // mo diem danh
                this.isEnableAttendance = true;
                this.txtAttendance.nativeElement.textContent = 'Bật Điểm Danh';
                this.btnAttendance.color = 'appbar';
                return;
            }

            if (res.state === 2) {
                this.isEnableAttendance = false;
                this.txtAttendance.nativeElement.textContent = 'Tắt Điểm Danh';
                this.btnAttendance.color = 'danger';
                this.class = [
                    {
                        class_id: res.data?.class_id,
                        class_name: res.data?.class_id
                    }
                ];
                this.subjects = [
                    {
                        subject_id: res.data?.subject_id,
                        subject_name: res.data?.subject_name
                    }
                ];

                this.selectedClass = this.class[0].class_id;
                this.selectedSubject = res.data.subject_id;

                this.checkEmptyTakeLeave();
                // this.checkEmptyHandMadeAT();
                return;
            }
        })
    }

    public async onChangeClass(v: any) {
        await this._sharedService.showLoading('Xin chờ...');
        this.selectedClass = v.detail.value;
        this.isEnableSelectSubject = !this.isEnableAttendance ? false : true;
        if (!this.info.infoClass.class_id) {
    
            // lay du lieu mon hoc tu server
            let subject = await this._sharedService.getSubjects(this.selectedClass);
            this.subscription = subject.subscribe((res: Subject[]) => {
                this.subjects = [...res];
                this.selectedSubject = res[0].subject_id;
                this._sharedService.loading.dismiss();
            });
            return;
        }
        return this._sharedService.loading.dismiss();
    }

    public onChangeRadius(v: any) {
        this.radius = v.detail.value;
    }

    public async onProcessAttendance() {
        if (this.isEnableAttendance) {
            if (this.selectedClass && this.selectedSubject) {
                return await this.addAttendanceTime(this.selectedClass, this.selectedSubject);
            }
            return this._sharedService.showToast('Thầy/Cô phải chọn thông tin trước khi bật điểm danh', 'danger');
        }
        return this.showAlertConfirm();
    }


    public async addAttendanceTime(classId: string, subjectId: string) {
        await this._sharedService.showLoading('Xin chờ...');
        let date: Date = new Date();
        let attendanceTime: string = '';
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        attendanceTime = `${date.getFullYear()}${this.formatDate(month)}`;
        attendanceTime += `${this.formatDate(day)}${this.formatDate(hours)}`;
        attendanceTime += `${this.formatDate(minutes)}${this.formatDate(seconds)}`;

        const options: GeolocationOptions = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 3600
        }

        const coordinates = await this._geolocation.getCurrentPosition(options);
        const { latitude } = coordinates.coords;
        const { longitude } = coordinates.coords;


        let result = await this._attendanceService.addAttendance(classId, subjectId, attendanceTime, latitude, longitude, this.radius);
        this.subscription = result.subscribe((res: { state: number }) => {
            if (res.state !== -1) {
                this._sharedService.loading.dismiss();
                this._sharedService.showToast('Bật điểm danh thành công!', 'success');
                this.isEnableAttendance = false;
                this.isEnableSelectSubject = false;
                this.btnAttendance.color = 'danger';
                this.txtAttendance.nativeElement.textContent = 'Tắt Điểm Danh';
                return;
            }
            this._sharedService.loading.dismiss();
            return this._sharedService.showToast('Bật điểm danh không thành công!', 'danger');
        });
    }

    private async notifications() {
        return await LocalNotifications.schedule({
            notifications: [
               {
                   id: 1,
                   title: 'Hãy tắt điểm danh',
                   body: 'Đã đến giờ, xin Thầy/Cô tắt điểm danh',
                   schedule: {
                       on: {
                           hour: 12,
                           minute: 30
                       },
                       allowWhileIdle: true,
                   }
               }
            ],
        })
    }

    public async onStopAttendance() {
        await this._sharedService.showLoading('Xin chờ...');
        const dateServer: string = this.info.dateServer;
        const stopAttendance = await this._attendanceService.stopAttendance(this.selectedClass, this.selectedSubject, this.atIdLast, dateServer);
        this.subscription = stopAttendance.subscribe((res: any) => {
            this._sharedService.loading.dismiss();
            this._sharedService.showToast('Tắt điểm danh thành công!', 'success');
            return this._router.navigate(['teacher', 'dashboard']);
        });
    }

    // Lay tat ca lop do giang vien day
    private async getClassByTeacher() {
        let classRoom = await this._sharedService.getClass();
        this.subscription = classRoom.subscribe((res: Class[]) => this.class = [...res]);
    }

    private formatDate(num: number): string {
        return num < 10 ? '0' + num : '' + num;
    }

    private async checkEmptyTakeLeave() {
        let currentTime: string = this._sharedService.getDatetime();
        let listStudent$ = await this._attendanceService.onCheckExistTakeLeave(this.selectedClass, this.selectedSubject, currentTime);
        this.subscription = listStudent$.subscribe((res: { state: boolean }) => {
            if (res.state) {
                return this.validEmptyTakeLeave = -1;
            }
            return;
        });
    }

    // private checkEmptyHandMadeAT() {
    //     let checkEmptyHandMadeAT$ = this._attendanceService.onCheckExistHandMadeAT(this.atIdLast);
    //     checkEmptyHandMadeAT$.subscribe((res: { is_exist_student_handmade: number }) => {
    //         if (+res.is_exist_student_handmade === 1) {
    //             return this.validHandMadeAT = -1;
    //         }
    //         return;
    //     });
    // }

    private processTurnOffAT() {
        // if (this.validHandMadeAT === -1) {
            // return this._sharedService.showToast(`Thầy/cô phải duyệt điểm danh thủ công trước!`, 'danger');
        // }
        if (this.validEmptyTakeLeave === -1) {
            return this._sharedService.showToast('Thầy/Cô phải xét duyệt sinh viên nghỉ trước!', 'danger');
        }

        if (this.validEmptyTakeLeave !== -1 && this.validHandMadeAT !== -1) {
            this.onStopAttendance();
        }
    }


    // xac thuc stop attendance
    async showAlertConfirm() {
        const alert = await this._alertCtrl.create({
            header: 'Xác thực!',
            message: '<strong>Thầy/Cô có muốn tắt điểm danh?</strong>!!!',
            buttons: [
                 {
                    text: 'Đồng ý',
                    handler: async () => {
                        this.processTurnOffAT();
                    }
                }, {
                    text: 'Hủy',
                    role: 'cancel',
                    handler: () => {}
                },
            ]
        });
        return await alert.present();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

interface Class {
    class_id: string;
    class_name: string;
}

interface Subject {
    subject_id: string;
    subject_name: string;
}