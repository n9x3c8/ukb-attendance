import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { DomainAPI } from 'src/app/shared/class/domain.class';
import { IinfoAT, IinfoStateAT } from '../defined/info.define';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class AttendanceService extends DomainAPI {
    private username: string;
    private options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    }

    constructor(private http: HttpClient, private _storageService: StorageService) {
        super();
        this.init();
    }
    async getInfoDetailsAttendance(currentDate: string) {
        this.username = await this._storageService.get('username');
        let uuid: any = await this.getIdDevice();
        let url: string = `${this.domain}/mvc/public/attendance/info_details_attendance_student/${this.username}/${currentDate}/${uuid}`;
        return await this.http.get(url).pipe( take(1) );
    }

    async isExistInRoom() {
        this.username = await this._storageService.get('username');
        let uuid: any = await this.getIdDevice();
        let url: string = `${this.domain}/mvc/public/attendance/check_exit_in_room/${this.username}/${uuid}`;
        return await this.http.get(url);
    }


    // Kiểm tra sv có phòng học hay chưa
    public async checkIDExistInRoom() {
        let username = await this._storageService.get('username');
        let uuid: any = await this.getIdDevice();
        let url: string = `${this.domain}/mvc/public/attendance/exist_in_attendance_student/${username}/${uuid}`;
        return await this.http.get(url).pipe( take(1) );
    }

    // Cập nhật trạng thái điểm danh sv
    public async updateStateAttendance() {
        let username = await this._storageService.get('username');
        let uuid: any = await this.getIdDevice();
        let url: string = `${this.domain}/mvc/public/attendance/state_attendance_student/${username}/${uuid}`;
        return await this.http.get(url).pipe( take(1) );
    }

    // Lấy thông tin count, thông tin môn, lớp học.
    public async getInfoStateAttendance(datetime: string) {
        this.username = await this._storageService.get('username');
        let uuid: any = await this.getIdDevice();
        let url: string = `${this.domain}/mvc/public/state/count_attendance/${this.username}/${uuid}/${datetime}`;
        return this.http.get(url);
    }

    // su dung getInfoStateAttendance
    public async stateAttendance(count: number, res: IinfoStateAT, timeserver?: number) {
        // 1 - bat diem danh    2 - Tat diem danh     3 - ngoai gio diem danh
        let hour: number = (new Date).getHours();
        //Đi học cả ngày

        //bật điểm danh 
        if (count === 0 && (hour >= 8 && hour <= 24 || true)) {
            return { state: 1, data: null };
        }

        if (count === 1 && hour >= 13 && hour <= 16 && timeserver >= 8 && timeserver <= 11) {
            return { state: 1, data: null };
        }
        //tắt điêm danh
        if ((count === 1 && (hour >= 8 && hour <= 24 || true)) || (count === 2 && (hour >= 8 && hour <= 16))) {
            let data: IinfoAT = {
                class_id: res.infoClass.class_id,
                class_name: res.infoClass.class_name,
                subject_id: res.infoSubject.subject_id,
                subject_name: res.infoSubject.subject_name
            };
            return { state: 2, data };
        }


        //đi học chiều, sáng nghỉ
        //bật điềm danh buổi chiều (sáng nghỉ)
        if (count === 0 && hour >= 13 && hour <= 16) {
            return { state: 1, data: null };
        }
        //tắt điểm danh buổi chiều (sáng nghỉ)
        if (count === 1 && hour >= 13 && hour <= 16 && timeserver >= 13 && timeserver <= 16) {
            let data: IinfoAT = {
                class_id: res.infoClass.class_id,
                class_name: res.infoClass.class_name,
                subject_id: res.infoSubject.subject_id,
                subject_name: res.infoSubject.subject_name
            };
            return { state: 2, data };
        }

        return { state: 3, data: null };
    }


    // ham kiem tra xem gv da tat diem danh hay chua
    // state 1: chua tat       0 la da tat
    public async checkOffAttendance(atIdlast: number) {
        this.username = await this._storageService.get('username');
        let uuid: any = await this.getIdDevice();
        let url: string = `${this.domain}/mvc/public/state/check_off_attendance/${this.username}/${uuid}/${atIdlast}`;
        return this.http.get(url);
    }


    // public async getTimeServer() {
    //     this.username = await this._storageService.get('username');
    //     let date = new Date();
    //     let month = this.formatDate(date.getMonth() + 1);
    //     let day = this.formatDate(date.getDate());
    //     let datetime: string = `${date.getFullYear()}${month}${day}`;
    //     let url: string = `${this.domain}/mvc/public/account/datetime_server`;
    //     let data = {
    //         teacher_id: this.username,
    //         date: datetime
    //     };
    //     return this.http.post(url, data, this.options);
    // }

    // private formatDate(num: number): string {
    //     return num < 10 ? '0' + num : '' + num;
    // }

    async addAttendance(classId: string, subjectId: string, attendanceTime: string, latitude: number, longitude: number, radius: number) {
        let username = await this._storageService.get('username');
        let uuid = await this.getIdDevice();
        let attendance = {
            class_id: classId,
            subject_id: subjectId,
            teacher_id: username,
            attendance_time: attendanceTime,
            latitude: latitude + '',
            longitude: longitude + '',
            radius
        };

        let url: string = `${this.domain}/mvc/public/attendance/add_attendance/${username}/${uuid}`;
        return this.http.post(url, attendance, this.options);
    }

    public async stopAttendance(classId: string, subjectId: string, atIdLast: number, dateServer: string) {
        this.username = await this._storageService.get('username');
        let uuid: any = await this.getIdDevice();
        let url: string = `${this.domain}/mvc/public/leave/student_leave/${classId}/${subjectId}/${this.username}/${uuid}/${atIdLast}/${dateServer}`;
        return this.http.get(url);
    }



    //kiem tra trang thai gv tat diem danh - check_stop_attendance
    public onCheckStopAttendance(atIdLast: number) {
        const URL: string = `${this.domain}/mvc/public/attendance/check_stop_attendance/${atIdLast}`;
        return this.http.get(URL);
    }

    // khi tat diem danh, kiem tra xem giang vien da duyet sinh vien xin nghi hay chua
    public async onCheckExistTakeLeave(classId: string, subjectId: string, currentDate: string) {
        this.username = await this._storageService.get('username');
        let uuid = await this.getIdDevice();
        const URL: string = `${this.domain}/mvc/public/attendance/check_exist_in_take_leave/${this.username}/${uuid}/${classId}/${subjectId}/${currentDate}`;
        return this.http.get(URL);
    }

    // khi tat diem danh, kiem tra xem co sv diem danh thu cong ko
    public onCheckExistHandMadeAT(atIdLast: number) {
        const URL: string = `${this.domain}/mvc/public/attendance/exist_student_handmade/${atIdLast}`;
        return this.http.get(URL);
    }

    // diem danh thu cong - update - state = 2
    public async handmadeAT() {
        this.username = await this._storageService.get('username');
        let data = {
            student_id: this.username
        };
        const URL: string = `${this.domain}/mvc/public/attendance/handmade_at`;
        return this.http.post(URL, data, this.options);
    }

    //lay ds sinh vien diem danh thu cong
    public getListHandMadeAT(attendanceIdLast: number) {
        const URL = `${this.domain}/mvc/public/attendance/list_student_handmade/${attendanceIdLast}`;
        return this.http.get(URL);
    }

    //update_state_when_handmade
    public updateStateWhenHandMade(studentId: string, state: number) {
        const URL = `${this.domain}/mvc/public/attendance/state_when_attendance_handmade/${studentId}/${state}`;
        return this.http.get(URL);
    }

    async init() {
        this.username = await this._storageService.get('username');
    }

}
