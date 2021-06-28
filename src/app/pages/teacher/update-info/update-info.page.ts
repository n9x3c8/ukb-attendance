import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ViewDidEnter } from "@ionic/angular";
import { Subscription } from "rxjs";
import { IinfoTeacher } from "src/app/shared/defined/info.define";
import { SharedService } from "src/app/shared/services/shared.service";
import { TeacherService } from "src/app/shared/services/teacher.service";

@Component({
    selector: 'attendance-update-info',
    templateUrl: 'update-info.page.html',
    styleUrls: ['update-info.page.scss']
})
export class UpdateInfoPage implements ViewDidEnter, OnDestroy{
    private subscription: Subscription;
    public infoTeacher: IinfoTeacher;
    constructor(
        private _router: Router,
        private _shareService: SharedService,
        private readonly _teacherService: TeacherService
    ) {}

    ionViewDidEnter() {
        this.init();
    }
    
    public async init() {
        await this._shareService.showLoading('Xin chờ...');
        const info = await this._teacherService.infoTeacher()
        this.subscription = info.subscribe((res: IinfoTeacher[]) => {
            if(res) {
                this.infoTeacher = {...res[0]};
                this._shareService.loading.dismiss();
                return;
            }
        });
    }

    public async onUpdateProfile(address: TypeForm, numphone: TypeForm, email: TypeForm) {
        await this._shareService.showLoading('Xin chờ...');
        let updateInfo = await this._teacherService.updateTeacher(address, numphone, email);
        this.subscription = updateInfo.subscribe(async (res: {state: string}) => {
            const state: number = parseInt(res.state);
            if(state !== -1) {
                this._shareService.loading.dismiss();
                this._shareService.showToast('Cập nhật thông tin thành công!', 'success');
                return this._router.navigate(['teacher', 'dashboard']);
            }
            return this._shareService.showToast('Cập nhật không thành công', 'danger');
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

type TypeForm = string | number;