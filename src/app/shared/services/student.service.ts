import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
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

  public async infoStudent() {
    this.username = await this._storageService.get('username');
    let uuid: any = await this.getIdDevice();
    
    let url: string = `${this.domain}/mvc/public/account/info_details_student/${this.username}/${uuid}`;
    return this.http.get(url).pipe( take(1) );
  }

  public async countTakeLeave(subject_id: string) {
    this.username = await this._storageService.get('username');
    let uuid = await this.getIdDevice();
    let url: string = `${this.domain}/mvc/public/leave/count_take_leave/${this.username}/${uuid}`;
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
    let uuid = await this.getIdDevice();
    let url: string = `${this.domain}/mvc/public/leave/check_take_leave/${this.username}/${uuid}`;
    let data = {
      student_id: this.username,
      subject_id,
      take_leave_date
    };
    return await this.http.post(url, data, this.options);
  }


  // them du lieu vao bang leaves
  public async addStudentInLeaves(subject_id: string, leave_time: string, leave_reason: string, take_leave_date: string) {
    this.username = await this._storageService.get('username');
    let uuid: any = await this.getIdDevice();
    let url: string = `${this.domain}/mvc/public/leave/add_student_in_leaves/${this.username}/${uuid}`;
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
    let uuid: any = await this.getIdDevice();
    const URL: string = `${this.domain}/mvc/public/notifications/notify_for_student/${this.username}/${uuid}`;
    return this.http.get(URL).pipe( take(1) );
  }


  //SV xem thong bao
  public async updateSeenNotify(list_leave_id: number) {
    this.username = await this._storageService.get('username');
    let uuid: any = await this.getIdDevice();
    const URL: string = ` ${this.domain}/mvc/public/notifications/check_seen_notification/${this.username}/${uuid}/${list_leave_id}`;
    return this.http.get(URL);
  }




  //thong ke
  public async getStudentDetail( currentDate: string ) {
    this.username = await this._storageService.get('username');
    let uuid: any = await this.getIdDevice();
    const URL: string = `${this.domain}/mvc/public/statistical/student_detail/${this.username}/${uuid}/${currentDate}`;
    return this.http.get(URL);
  }

  //danh sach don xin nghi
  public async getListLeaveApplication( currentDate: string ) {
    this.username = await this._storageService.get('username');
    let uuid: any = await this.getIdDevice();
    const URL: string = `${this.domain}/mvc/public/student/leave_application/${this.username}/${uuid}/${currentDate}`;
    return this.http.get(URL);
  }

  //chinh sua don xin nghi
  public async updateTakeLeave( leaveId: number, leaveTime: string, leaveReason: string, takeLeaveDate: string ) {
    this.username = await this._storageService.get('username');
    let uuid: any = await this.getIdDevice();
    const URL: string = `${this.domain}/mvc/public/student/edit_take_leave/${this.username}/${uuid}/${leaveId}/${leaveTime}/${leaveReason}/${takeLeaveDate}`;
    let data = {
      leave_id: leaveId,
      leave_time: leaveTime,
      leave_reason: leaveReason,
      take_leave_date: takeLeaveDate
    };
    return this.http.post(URL, data, this.options);
  }

  //xoa don xin nghi
  public async removeTakeLeave( leaveId: number ) {
    this.username = await this._storageService.get('username');
    let uuid: any = await this.getIdDevice();
    const URL: string = `${this.domain}/mvc/public/student/remove_take_leave/${this.username}/${uuid}/${leaveId}`;
    return this.http.get(URL, this.options);
  }



  async init() {
    this.username = await this._storageService.get('username');
  }
}
