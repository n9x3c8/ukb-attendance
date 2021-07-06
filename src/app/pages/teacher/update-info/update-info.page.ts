import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
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
    public teacher: IinfoTeacher;
    public image: File;
    public isEnableUpdate: boolean;

    @ViewChild('inputfile', {static: true}) inputFile: ElementRef<HTMLInputElement>;


    constructor(
        private _router: Router,
        private _shareService: SharedService,
        private readonly _teacherService: TeacherService
    ) {
        this.isEnableUpdate = true;
    }

    ionViewDidEnter() {
        this.init();
    }
    
    public async init() {
        await this._shareService.showLoading('Xin chờ...');
        const info = await this._teacherService.infoTeacher()
        this.subscription = info.subscribe((res: IinfoTeacher[]) => {
            if(res) {
                this.teacher = {...res[0]};
                console.log(this.teacher);
                
                this._shareService.loading.dismiss();
                return;
            }
        });
    }

    public onPickFile() {
        this.inputFile.nativeElement.click();
    }

    public selectFile(event) {
        if (event.target.files && event.target.files.length) {
            return this.image = event.target.files[0];
        }
    }

    public async onUpdateProfile(address: TypeForm, numphone: TypeForm, email: TypeForm, birthday) {
        await this._shareService.showLoading('Xin chờ...');
        let updateInfo = await this._teacherService.updateTeacher(address, numphone, email);
        this.subscription = updateInfo.subscribe(async (res: {state: string}) => {
            const state: number = parseInt(res.state);
            if(state !== -1) {
                this._shareService.loading.dismiss();
                this.isEnableUpdate = false;
                return this._shareService.showToast('Cập nhật thông tin thành công!', 'success');
            }
            return this._shareService.showToast('Cập nhật không thành công', 'danger');
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

type TypeForm = string | number;