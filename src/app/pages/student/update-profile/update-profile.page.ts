import { Component, Input } from "@angular/core";
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
    @Input() student: any;

    constructor(
        private _storageService: StorageService,
        private http: HttpClient,
        private readonly _sharedService: SharedService,
        private _studentService: StudentService,
    ) {
        super();
    }

    async ionViewDidEnter() {
        await this._sharedService.showLoading('Xin chờ...');
        const infoStudent = await this._studentService.infoStudent();
        infoStudent.subscribe((res: any) => {
            if (res.length !== 0) {
                this.student = res[0];

                if(!this.student?.student_avatar) {
                    this.avatarUrl = `../../../../assets/images/avatar.jpg`;
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

    public async onUpdateProfile(address: any, numphone: any, email: any) {
        await this._sharedService.showLoading('Xin chờ...');
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
        formData.append('student_avatar', this.student?.student_avatar);


        this.http.post(url, formData).subscribe((rs: IStatusUpdateProfile) => {
            this._sharedService.loading.dismiss();
           
            if (rs?.upload_state_avatar != 1 && rs?.upload_state_avatar !== 'file_not_found') {
                let msg: string = `Upload không thành công - ${rs?.upload_state_avatar}!!!`;
                return this._sharedService.showToast(msg, 'danger');
            }

            if (rs?.update_state_info !== 1) {
                let msg: string = `Cập nhật không thành công!!!`;
                return this._sharedService.showToast(msg, 'danger');
            }
            this.avatarUrl = `${this.domain}/mvc/public/images/${rs.avatar_new}`;
            let msg: string = `Cập nhật thành công!!!`;
            return this._sharedService.showToast(msg, 'success');
        });
    }
}
