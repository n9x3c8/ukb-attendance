import { Component, ElementRef, ViewChild } from "@angular/core";
import { ViewDidEnter } from "@ionic/angular";
import { SharedService } from "src/app/shared/services/shared.service";
import { StudentService } from "src/app/shared/services/student.service";
import { HttpClient } from '@angular/common/http';
import { DomainAPI } from 'src/app/shared/class/domain.class';
import { IStatusUpdateProfile } from 'src/app/shared/defined/info.define';
import { StorageService } from "src/app/shared/services/storage.service";
import { AccountService } from "src/app/shared/services/account.service";

@Component({
    selector: 'attendance-update-profile',
    templateUrl: 'update-profile.page.html',
    styleUrls: ['update-profile.page.scss']
})
export class UpdateProfilePage extends DomainAPI implements ViewDidEnter {
    private image: File | null;

    private avatarCurrent: string;

    public avatarUrl: string;
    public isEnableUpdate: boolean;
    public student: IStudent;
    public gender: string;
    @ViewChild('inputfile', { static: true }) inputFile: ElementRef<HTMLInputElement>;

    constructor(
        private http: HttpClient,
        private _storageService: StorageService,
        private _accountService: AccountService,
        private readonly _sharedService: SharedService,
        private _studentService: StudentService,
    ) {
        super();
        this.isEnableUpdate = true;
    }

    async ionViewDidEnter() {
        await this._sharedService.showLoading('Xin chờ...');
        const infoStudent = await this._studentService.infoStudent();
        infoStudent.subscribe((res: IStudent[]) => {
            if (res.length !== 0) {
                this.student = res[0];
                this.gender = +res[0].student_gender === 1 ? 'male' : 'female';

                if (!this.student?.student_avatar) {
                    let avatarDefault: string = +this.student?.student_gender === 1 ? 'avatar-male.webp' : 'avatar-female.webp';
                    this.avatarUrl = `assets/images/${avatarDefault}`;
                    this._sharedService.loading.dismiss();
                    return;
                }

                this.avatarUrl = `${this.domain}/mvc/public/images/${this.student.student_avatar}`;
                this._sharedService.loading.dismiss();
            }
        });
    }

    public onClick() {
        this.inputFile.nativeElement.click();
    }

    public selectFile(event) {
        const onHandleAgree = async () => {
            await this._sharedService.showLoading('Đang tải lên...');
            if (!event.target.files && !event.target.files.length) {
                return;
            }
            this.image = event.target.files[0];
            let avatar: string = this.avatarCurrent ?? this.student?.student_avatar;
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

    public async onUpdateProfile(address, numphone, email, inputBirthday) {
        await this._sharedService.showLoading('Đang cập nhật...');
        let permission = await this._storageService.get('permission_id');
        const { value } = inputBirthday.el;
        const ARRAY_BIRTHDAY: string[] = value.split('T');
        let birthday: string = ARRAY_BIRTHDAY[0].split('-').join('');

        const VALID_DATA: boolean = address && numphone && email;

        if (!VALID_DATA) {
            this._sharedService.loading.dismiss();
            return this._sharedService.showToast('Không được để trống dữ liệu!', 'danger');
        }

        const formData = new FormData();
        formData.append('id', this.student.student_id);
        formData.append('permission', permission);
        formData.append('gender', this.gender === 'male' ? '1' : '0');
        formData.append('birthday', birthday);
        formData.append('address', address);
        formData.append('phone', numphone);
        formData.append('email', email);
        
        let update$ = await this._accountService.updateProfile(formData);
        update$.subscribe((rs: IStatusUpdateProfile) => {
            this._sharedService.loading.dismiss();
            if (rs?.update_state_info !== 1) {
                let msg: string = `Cập nhật không thành công!!!`;
                return this._sharedService.showToast(msg, 'danger');
            }

            this.isEnableUpdate = false;
            let msg: string = `Cập nhật thành công!!!`;
            return this._sharedService.showToast(msg, 'success');
        });
    }
}


interface IStudent {
    class_id: string;
    student_address: string;
    student_avatar: string | null;
    student_birthday: string;
    student_email: string;
    student_gender: string;
    student_id: string;
    student_name: string;
    student_numphone: string;
}