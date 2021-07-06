import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, ViewDidEnter } from "@ionic/angular";
import { Subject } from "src/app/shared/defined/subject.define";
import { SharedService } from "src/app/shared/services/shared.service";
import { StudentService } from "src/app/shared/services/student.service";
import { SubjectService } from "src/app/shared/services/subject.service";

@Component({
    selector: 'attendance-take-leave',
    templateUrl: 'take-leave.page.html',
    styleUrls: ['take-leave.page.scss']
})
export class TakeLeavePage implements ViewDidEnter {
    public subjects: Subject[];
    public selectedSubject: string;
    public leaveReason: string;

    public currentDate: string;
    public maxDate: string;

    public isEnableSend: boolean;
    // ngay muon nghi
    public date: string;

    private year: number | string;
    private month: number | string;
    // date
    private d: number | string;


    constructor(
        private readonly _router: Router,
        private _alertCtrl: AlertController,
        private readonly _sharedService: SharedService,
        private readonly _studentService: StudentService,
        private readonly _subjectService: SubjectService,
    ) {
        this.isEnableSend = true;
        let year: number = (new Date).getFullYear();
        this.maxDate = `${year}-12-31`;
    }


    ionViewDidEnter() {
        this.init();
    }

    public async init() {
        await this._sharedService.showLoading('Xin chờ...');
        let subjects = await this._subjectService.getSubjectsByStudent();
        subjects.subscribe((res: Subject[]) => {
            this.subjects = [...res];
            this._sharedService.loading.dismiss();
        });

        this.currentDate = this.processDateTimeCurrent();
    }

    // xu ly thoi gian hien tai
    private processDateTimeCurrent(): string {
        const date: Date = new Date();
        let year: number = date.getFullYear();
        let month: string = this._sharedService.formatDate(date.getMonth() + 1);
        let day: string = this._sharedService.formatDate(date.getDate());
        return `${year}-${month}-${day}`;
    }



    public getTakeLeaveDateTime(v) {
        let date = v.detail.value;
        let datetime = date.slice(0, 10);
        let time = datetime.split('-');
        this.d = time[2];
        this.month = time[1];
        this.year = time[0];
        this.date = `${this.year}${this.month}${this.d}`;
    }



    public async onChangeSubject(v) {
        let count = await this._studentService.countTakeLeave(this.selectedSubject);
        count.subscribe(async (res: any) => {
            if (res.state !== -1) {
                let count: number = parseInt(res[0].quantity_take_leave_subject);
                if (count > 3) {
                    this.subjects = [];
                    let message: string = `Môn ${this.selectedSubject} bạn đã nộp đơn xin nghỉ ${count} lần rồi !!`;
                    let cb = () => {
                        this._router.navigate(['dashboard-student']);
                    }
                    return this.presentActionSheet(message, 'Cảnh báo', cb);
                }
            }
        });
    }

    public validLeaveReason(ev) {
        let { value } = ev.detail;
        if(value.length > 200) {
            this.leaveReason = '';
            return this._sharedService.showToast('Lý do phải nhỏ hơn 200 ký tự!', 'danger');
        }
        this.leaveReason = value;
        return;
    }

    public async onAddStudentInLeave() {
        await this._sharedService.showLoading('Xin chờ...');
        if (!this.selectedSubject || !this.date || !this.leaveReason) {
            this._sharedService.loading.dismiss();
            return await this._sharedService.showToast('Hãy nhập thông tin đầy đủ trước', 'danger');
        }

        let state = await this._studentService.checkTakeLeaveNumber(this.selectedSubject, this.date);
        state.subscribe(async (res: any) => {
            const state: number = parseInt(res[0]?.state);
            if (state == 1) {
                let message: string = `Bạn đã nộp đơn xin nghỉ môn ${this.selectedSubject}
                vào ngày ${this.d}/${this.month}/${this.year}!`;
                this._sharedService.loading.dismiss();
                return this.presentActionSheet(message);
            }
            let leaveTime: string = this._sharedService.getCurrentTime();
            let takeLeave = this._studentService.addStudentInLeaves(this.selectedSubject, leaveTime, this.leaveReason, this.date);
            (await takeLeave).subscribe( async (res: { state: number }) => {
                if (res.state !== -1) {
                    this._sharedService.loading.dismiss();
                    this.isEnableSend = false;
                    return this._sharedService.showToast('Gửi đơn xin nghỉ thành công!', 'success');
                }
                this._sharedService.loading.dismiss();
                return this._sharedService.showToast('Gửi đơn xin nghỉ không thành công!', 'danger');
            })
        });
    }

    async presentActionSheet(message: string, header: string = 'Thông báo', cb?: Function) {
        const actionSheet = await this._alertCtrl.create({
            header,
            message,
            buttons: [{
                text: 'Okey',
                handler: () => {
                    cb ? cb() : '';
                }
            }]
        });

        return await actionSheet.present();
    }
}
