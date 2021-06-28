import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomainAPI } from 'src/app/shared/class/domain.class';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends DomainAPI {
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

  //Student
  public async infoStudent() {
    this.username = await this._storageService.get('username');
    let url: string = `${this.domain}/mvc/public/account/info_details_student/${this.username}`;
    return this.http.get(url);
  }

  // async updateStudent(id: string, name: string, address: any, email: any, phone: any) {
  //   this.username = await this._storage.get('username');
  //   let url: string = `${this.domain}/mvc/public/account/update_profile_student`;
  //   let data = { id, name, address, email, phone };
  //   return await this.http.post(url, data);
  // }


  public async countTakeLeave(subject_id: string) {
    this.username = await this._storageService.get('username');
    let url: string = `${this.domain}/mvc/public/leave/count_take_leave`;
    let data = {
      student_id: this.username,
      subject_id
    };
    return await this.http.post(url, data, this.options);
  }

  // kiem tra xem sinh vien da xin nghi hay chua?
  // toi da so lan nghi cua sinh vien la 3
  public async checkTakeLeaveNumber(subject_id: string, take_leave_date: string) {
    this.username = await this._storageService.get('username');
    let url: string = `${this.domain}/mvc/public/leave/check_take_leave`;
    let data = {
      student_id: this.username,
      subject_id,
      take_leave_date
    };
    return await this.http.post(url, data, this.options);
  }


  // them du lieu vao bang leaves
  public addStudentInLeaves(subject_id: string, leave_time: string, leave_reason: string, take_leave_date: string) {
    let url: string = `${this.domain}/mvc/public/leave/add_student_in_leaves`;
    const data = {
      student_id: this.username,
      subject_id,
      leave_time,
      leave_reason,
      take_leave_date
    };
    return this.http.post(url, data, this.options);
  }


  public async notifications() {
    this.username = await this._storageService.get('username');
    const URL: string = `${this.domain}/mvc/public/notifications/notify_for_student/${this.username}`;
    return this.http.get(URL);
  }


  //SV xem thong bao
  public async updateSeenNotify(list_leave_id: number) {
    const URL: string = ` ${this.domain}/mvc/public/notifications/check_seen_notification/${list_leave_id}`;
    return this.http.get(URL);
  }




  //thong ke
  public async getStudentDetail( currentDate: string ) {
    let username: string = await this._storageService.get('username');
    const URL: string = `${this.domain}/mvc/public/statistical/student_detail/${username}/${currentDate}`;
    return this.http.get(URL);
  }

  //danh sach don xin nghi
  public async getListLeaveApplication( currentDate: string ) {
    let username: string = await this._storageService.get('username');
    const URL: string = `${this.domain}/mvc/public/student/leave_application/${username}/${currentDate}`;
    return this.http.get(URL);
  }

  //chinh sua don xin nghi
  public updateTakeLeave( leaveId: number, leaveTime: string, leaveReason: string, takeLeaveDate: string ) {
    const URL: string = `${this.domain}/mvc/public/student/edit_take_leave/${leaveId}/${leaveTime}/${leaveReason}/${takeLeaveDate}`;
    let data = {
      leave_id: leaveId,
      leave_time: leaveTime,
      leave_reason: leaveReason,
      take_leave_date: takeLeaveDate
    };
    return this.http.post(URL, data, this.options);
  }

  //xoa don xin nghi
  public removeTakeLeave( leaveId: number ) {
    const URL: string = `${this.domain}/mvc/public/student/remove_take_leave/${leaveId}`;
    return this.http.get(URL, this.options);
  }



  async init() {
    this.username = await this._storageService.get('username');
  }
}
