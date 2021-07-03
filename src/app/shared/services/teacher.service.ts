import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomainAPI } from 'src/app/shared/class/domain.class';
import { Ipagination } from '../defined/info.define';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService  extends DomainAPI{
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
  async init() {
    this.username = await this._storageService.get('username');
  }

  // Lay ra danh sach sinh vien xin nghi
  public async listStudentTakeLeave(currentTime: string) {
    this.username = await this._storageService.get('username');
    let uuid = await this.getIdDevice();
    let url: string = `${this.domain}/mvc/public/leave/notification_take_leave/${this.username}/${uuid}/${currentTime}`;
    return this.http.get(url);
  }

  // dem thong bao sv xin nghi cho giang vien
  public async getCountNotifications(currentTime: string) {
    this.username = await this._storageService.get('username');
    let uuid = await this.getIdDevice();
    let url: string = `${this.domain}/mvc/public/leave/count_notification_take_leave/${this.username}/${uuid}/${currentTime}`;
    return this.http.get(url);
  }

  //Teacher
  public async  infoTeacher() {
    this.username = await this._storageService.get('username');
    let uuid: any = await this.getIdDevice();
    const url: string = `${this.domain}/mvc/public/account/info_details_teacher/${this.username}/${uuid}`;
    return this.http.get(url);
  }

  public updateTeacher(address: any, phone: any, email: any) {
    let url: string = `${this.domain}/mvc/public/account/update_profile_teacher`;
    const data = { id: this.username, address, phone, email };
    return this.http.post(url, data, this.options);
  }

  public async statistical(year: number) {
    this.username = await this._storageService.get('username');
    let uuid: any = await this.getIdDevice();
    let url: string = `${this.domain}/mvc/public/statistical/teach_detail/${this.username}/${uuid}/${year}`;
    return this.http.get(url);
  }

  //get_list_student_leave_permission_agree
  public async getListStudentLeavePermissionAgree(class_id: string, subject_id: string, current_date: string) {
    this.username = await this._storageService.get('username');
    let uuid: any = await this.getIdDevice();
    let url: string = `${this.domain}/mvc/public/student/list_student_leave_permission_agree/${this.username}/${uuid}/${class_id}/${subject_id}/${current_date}`;
    return this.http.get(url);
  }
  // list_student_leave_permission_denine
  public async getListStudentLeavePermissionDenine(class_id: string, subject_id: string, current_date: string) {
    this.username = await this._storageService.get('username');
    let uuid: any = await this.getIdDevice();
    let url: string = `${this.domain}/mvc/public/student/list_student_leave_permission_denine/${this.username}/${uuid}/${class_id}/${subject_id}/${current_date}`;
    return this.http.get(url);
  }

  //list_student_without_permission
  public async getListStudentWithoutPermission(class_id: string, subject_id: string, current_date: string) {
    this.username = await this._storageService.get('username');
    let uuid: any = await this.getIdDevice();
    let url: string = `${this.domain}/mvc/public/student/list_student_without_permission/${this.username}/${uuid}/${class_id}/${subject_id}/${current_date}`;
    return this.http.get(url);
  }


  	//lay ds sv đi học buổi hôm đó (trạng thai) - list_student
    public async getListStudent(classId: string, subjectId: string, currentDate: string, pagination?: Ipagination) {
      this.username = await this._storageService.get('username');
      let uuid = await this.getIdDevice();
      const LENGTH: number = pagination?.length ?? 10;
      const CURRENT_PAGE: number = pagination?.currentPage ?? 1;
      
      const URL: string = `${this.domain}/mvc/public/student/list_student/${this.username}/${uuid}/${classId}/${subjectId}/${currentDate}&p=${CURRENT_PAGE}&length=${LENGTH}`;
      return this.http.get(URL);
    }

    // lay ra buoi nghi cua sinh vien
    // public async getLeaveSession(studentId: string, subjectId: string) {
    //   this.username = await this._storageService.get('username');
    //   let uuid = await this.getIdDevice();
    //   const URL: string = `${this.domain}/mvc/public/student/leave_session/${this.username}/${uuid}/${studentId}/${subjectId}`;
    //   return this.http.get(URL);
    // }

    //lay ra ds sinh vien cua tung lop-mon (trong statistical)
    public async getStudentStatistical(classId: string, subjectId: string, currentDate: string) {
      this.username = await this._storageService.get('username');
      let uuid: any = await this.getIdDevice();
      const URL: string = `${this.domain}/mvc/public/statistical/list_student_by_statistical/${this.username}/${uuid}/${classId}/${subjectId}/${currentDate}`;
      return this.http.get(URL);
    }

    // lay ra ds nghi cua sinh vien | chuc nang thong ke
    public async getListLeaveDate(studentId: string, subjectId: string, currentDate: string) {
      let uuid: any = await this.getIdDevice();
      const URL: string = `${this.domain}/mvc/public/statistical/list_leave_date/${studentId}/${uuid}/${subjectId}/${currentDate}`;
      return this.http.get(URL);
    }

    //trong chi tiet buoi hoc (nghi k phep) GV cap nhap
    public async deleteWithoutLeave(studentId: string, subjectId: string, currentDate: string) {
      let uuid: any = await this.getIdDevice();
      const URL: string = `${this.domain}/mvc/public/leave/rm_without_leave/${studentId}/${uuid}/${subjectId}/${currentDate}`;
      return this.http.get(URL);
    }

}
