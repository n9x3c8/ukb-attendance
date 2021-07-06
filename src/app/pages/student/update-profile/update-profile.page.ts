import { Component, ElementRef, ViewChild } from "@angular/core";
import { ViewDidEnter } from "@ionic/angular";
import { SharedService } from "src/app/shared/services/shared.service";
import { StudentService } from "src/app/shared/services/student.service";
import { HttpClient } from '@angular/common/http';
import { DomainAPI } from 'src/app/shared/class/domain.class';
import { IStatusUpdateProfile } from 'src/app/shared/defined/info.define';
import { StorageService } from "src/app/shared/services/storage.service";

@Component({
    selector: 'attendance-update-profile',
    templateUrl: 'update-profile.page.html',
    styleUrls: ['update-profile.page.scss']
})
export class UpdateProfilePage extends DomainAPI implements ViewDidEnter {
    private image: File | null;
    public avatarUrl: string;
    public isEnableUpdate: boolean;
    public student: IStudent;
    @ViewChild('inputfile', { static: true }) inputFile: ElementRef<HTMLInputElement>;

    public onClick() {
        this.inputFile.nativeElement.click();
    }

    constructor(
        private _storageService: StorageService,
        private http: HttpClient,
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

    public selectFile(event) {
        if (event.target.files && event.target.files.length) {
            return this.image = event.target.files[0];
        }
    }

    public async onUpdateProfile(address, numphone, email, inputBirthday) {
        await this._sharedService.showLoading('Đang cập nhật...');

        const { value } = inputBirthday.el;
        const ARRAY_BIRTHDAY: string[] = value.split('T');
        let birthday: string = ARRAY_BIRTHDAY[0].split('-').join('');

        const VALID_DATA: boolean = address && numphone && email;

        if (!VALID_DATA) {
            this._sharedService.loading.dismiss();
            return this._sharedService.showToast('Không được để trống dữ liệu!', 'danger');
        }

        let url: string = `${this.domain}/mvc/public/account/update_profile_student`;
        const PERMISSION_ID = await this._storageService.get('permission_id');
        const formData = new FormData();
        formData.append('image', this.image);
        formData.append('student_id', this.student.student_id);
        formData.append('permission_id', PERMISSION_ID);
        formData.append('student_name', this.student.student_name);
        formData.append('student_address', address);
        formData.append('student_numphone', numphone);
        formData.append('student_email', email);
        formData.append('student_birthday', birthday);
        formData.append('student_avatar', this.student?.student_avatar);

        this.http.post(url, formData).subscribe((rs: IStatusUpdateProfile) => {
            this._sharedService.loading.dismiss();
            console.log(rs);

            if (rs?.upload_state_avatar != 1 && rs?.upload_state_avatar !== 'file_not_found') {
                let msg: string = `Upload không thành công - ${rs?.upload_state_avatar}!!!`;
                return this._sharedService.showToast(msg, 'danger');
            }

            if (rs?.update_state_info !== 1) {
                let msg: string = `Cập nhật không thành công!!!`;
                return this._sharedService.showToast(msg, 'danger');
            }
            if (rs?.upload_state_avatar !== 'file_not_found') {
                this.avatarUrl = `${this.domain}/mvc/public/images/${rs.avatar_new}`;
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