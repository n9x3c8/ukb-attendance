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
    let url: string = `${this.domain}/mvc/public/leave/notification_take_leave/${this.username}/${currentTime}`;
    return this.http.get(url);
  }

  //Teacher
  public async  infoTeacher() {
    this.username = await this._storageService.get('username');
    const url: string = `${this.domain}/mvc/public/account/info_details_teacher/${this.username}`;
    return this.http.get(url);
  }

  public updateTeacher(address: any, phone: any, email: any) {
    let url: string = `${this.domain}/mvc/public/account/update_profile_teacher`;
    const data = { id: this.username, address, phone, email };
    return this.http.post(url, data, this.options);
  }

  public async statistical(year: number) {
    this.username = await this._storageService.get('username');
    let url: string = `${this.domain}/mvc/public/statistical/teach_detail/${this.username}/${year}`;
    return this.http.get(url);
  }

  //get_list_student_leave_permission_agree
  public getListStudentLeavePermissionAgree(class_id: string, subject_id: string, current_date: string) {
    let url: string = `${this.domain}/mvc/public/student/list_student_leave_permission_agree/${class_id}/${subject_id}/${current_date}`;
    return this.http.get(url);
  }
  // list_student_leave_permission_denine
  public async getListStudentLeavePermissionDenine(class_id: string, subject_id: string, current_date: string) {
    this.username = await this._storageService.get('username');
    let url: string = `${this.domain}/mvc/public/student/list_student_leave_permission_denine/${class_id}/${subject_id}/${current_date}`;
    return this.http.get(url);
  }

  //list_student_without_permission
  public async getListStudentWithoutPermission(class_id: string, subject_id: string, current_date: string) {
    this.username = await this._storageService.get('username');
    let url: string = `${this.domain}/mvc/public/student/list_student_without_permission/${class_id}/${subject_id}/${current_date}`;
    return this.http.get(url);
  }


  	//lay ds sv đi học buổi hôm đó (trạng thai) - list_student
    public getListStudent(classId: string, subjectId: string, currentDate: string, pagination?: Ipagination) {
      const LENGTH: number = pagination?.length ?? 10;
      const CURRENT_PAGE: number = pagination?.currentPage ?? 1;
      
      const URL: string = `${this.domain}/mvc/public/student/list_student/${classId}/${subjectId}/${currentDate}&p=${CURRENT_PAGE}&length=${LENGTH}`;
      return this.http.get(URL);
    }

    // lay ra buoi nghi cua sinh vien
    public getLeaveSession(studentId: string, subjectId: string) {
      const URL: string = `${this.domain}/mvc/public/student/leave_session/${studentId}/${subjectId}`;
      return this.http.get(URL);
    }

    //lay ra ds sinh vien cua tung lop-mon (trong statistical)
    public getStudentStatistical(classId: string, subjectId: string, currentDate: string) {
      const URL: string = `${this.domain}/mvc/public/statistical/list_student_by_statistical/${classId}/${subjectId}/${currentDate}`;
      return this.http.get(URL);
    }

    //trong chi tiet buoi hoc (nghi k phep) GV cap nhap
    public deleteWithoutLeave(studentId: string, subjectId: string, currentDate: string) {
      const URL: string = `${this.domain}/mvc/public/leave/rm_without_leave/${studentId}/${subjectId}/${currentDate}`;
      return this.http.get(URL);
    }

}
