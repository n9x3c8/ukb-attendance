import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ViewDidEnter } from "@ionic/angular";
import { Subscription } from "rxjs";
import { DomainAPI } from "src/app/shared/class/domain.class";
import { IinfoTeacher, IStatusUpdateProfile } from "src/app/shared/defined/info.define";
import { AccountService } from "src/app/shared/services/account.service";
import { SharedService } from "src/app/shared/services/shared.service";
import { StorageService } from "src/app/shared/services/storage.service";
import { TeacherService } from "src/app/shared/services/teacher.service";

@Component({
    selector: 'attendance-update-info',
    templateUrl: 'update-info.page.html',
    styleUrls: ['update-info.page.scss']
})
export class UpdateInfoPage extends DomainAPI implements ViewDidEnter, OnDestroy {
    private subscription: Subscription;
    public teacher: IinfoTeacher;
    public image: File;
    public isEnableUpdate: boolean;

    public avatarUrl: string;
    private avatarCurrent: string;
    public gender: string;

    @ViewChild('inputfile', { static: true }) inputFile: ElementRef<HTMLInputElement>;


    constructor(
        private http: HttpClient,
        private _storageService: StorageService,
        private _accountService: AccountService,
        private _sharedService: SharedService,
        private readonly _teacherService: TeacherService
    ) {
        super();
        this.isEnableUpdate = true;
    }

    ionViewDidEnter() {
        this.init();
    }

    public async init() {
        await this._sharedService.showLoading('Xin chờ...');
        const info = await this._teacherService.infoTeacher()
        this.subscription = info.subscribe((res: IinfoTeacher[]) => {
            if (res) {
                this.teacher = { ...res[0] };
                if (!this.teacher?.teacher_avatar) {
                    let avatarDefault: string = +this.teacher?.teacher_gender === 1 ? 'avatar-male.webp' : 'avatar-female.webp';
                    this.avatarUrl = `assets/images/${avatarDefault}`;
                    this._sharedService.loading.dismiss();
                    return;
                }

                this.avatarUrl = `${this.domain}/mvc/public/images/${this.teacher.teacher_avatar}`;
                this.gender = +this.teacher?.teacher_gender === 1 ? 'male' : 'female';
                this._sharedService.loading.dismiss();
                return;
            }
        });
    }

    public onPickFile() {
        this.inputFile.nativeElement.click();
    }

    public selectFile(event) {
        const onHandleAgree = async () => {
            await this._sharedService.showLoading('Đang tải lên...');
            if (!event.target.files && !event.target.files.length) {
                return;
            }
            this.image = event.target.files[0];
            let avatar: string = this.avatarCurrent ?? this.teacher?.teacher_avatar;
            const PERMISSION_ID = await this._storageService.get('permission_id');
            const username = await this._storageService.get('username');

            let url: string = `${this.domain}/mvc/public/account/upload_avatar/${PERMISSION_ID}/${avatar}`;
            const formData = new FormData();
            formData.append('image', this.image);
            formData.append('permission_id', PERMISSION_ID);
            formData.append('username', username);


            this.http.post(url, formData).subscribe((rs: { state: string, filename: string }) => {
                if (rs?.state !== 'upload_success') {
                    this._sharedService.loading.dismiss();
                    return this._sharedService.showToast(rs.state, 'danger');
                }

                this.avatarUrl = `${this.domain}/mvc/public/images/${rs.filename}`;
                this.avatarCurrent = rs.filename;
                this._sharedService.loading.dismiss();
                return this._sharedService.showToast('Thay đổi ảnh đại diện thành công!', 'success');
            });
        };

        let msg: string = '<strong>Bạn có muốn thay đổi ảnh đại diện?</strong>';
        this._sharedService.showAlert(msg, 'Thông báo', onHandleAgree);
    }

    public async onUpdateProfile(address: TypeForm, numphone: TypeForm, email: TypeForm, birthday) {
        await this._sharedService.showLoading('Xin chờ...');
        let permission = await this._storageService.get('permission_id');
        const ARRAY_BIRTHDAY: string[] = birthday.split('T');
        let birthday2: string = ARRAY_BIRTHDAY[0].split('-').join('');

        const formData = new FormData();
        formData.append('id', this.teacher.teacher_id);
        formData.append('permission', permission);
        formData.append('gender', this.gender === 'male' ? '1' : '0');
        formData.append('birthday', birthday2);
        formData.append('address', (address as string));
        formData.append('phone', (numphone as string));
        formData.append('email', (email as string));

        let update$ = await this._accountService.updateProfile(formData);
        update$.subscribe((rs: IStatusUpdateProfile) => {
            this._sharedService.loading.dismiss();
            if (rs?.update_state_info !== 1) {
                let msg: string = `Cập nhật không thành công!!!`;
                return this._sharedService.showToast(msg, 'danger');
            }

            // this.isEnableUpdate = false;
            let msg: string = `Cập nhật thành công!!!`;
            return this._sharedService.showToast(msg, 'success');
        })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

type TypeForm = string | number;