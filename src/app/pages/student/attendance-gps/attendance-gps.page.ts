import { Component, OnDestroy, OnInit } from "@angular/core";
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation/ngx';
import { AttendanceService } from "src/app/shared/services/attendance.service";
import { SharedService } from "src/app/shared/services/shared.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'attendance-gps',
  templateUrl: 'attendance-gps.page.html',
  styleUrls: ['attendance-gps.page.scss']
})
export class AttendanceGPSPage implements OnInit, OnDestroy {
  public teacherTatitude: number;
  public teacherLongitude: number;
  private latOfStudent: number;
  private longOfStudent: number;
  public radius: number;
  
  public isEnableAttendance: boolean;
  public subscription: Subscription;

  public infoDetailAttendance: any;

  constructor(
    private _geolocation: Geolocation,
    private _attendanceService: AttendanceService,
    private _sharedService: SharedService
  ) {}

  public async ngOnInit() {
    await this.init();
    await this.checkPermissionAttendance();
    await this.getLocationStudent();
  }

  private async init() {
    let currentDate: string = this._sharedService.getDatetime();
    const infoAttendance$ = await this._attendanceService.getInfoDetailsAttendance(currentDate);
    infoAttendance$.subscribe((res: any) => {
      if(res?.length !== 0) {
        this.infoDetailAttendance = [...res];
        let leaveSession: number = this.infoDetailAttendance[0]?.leave_session;
        let subjectName: string = this.infoDetailAttendance[0]?.subject_name;
        this.checkLeaveSession(leaveSession, subjectName);
      }      
    });
  }

  private async checkPermissionAttendance() {
    const isEnable = await this._attendanceService.checkIDExistInRoom();
    this.subscription = isEnable.subscribe((res: { is_exist_in_attendance_student }) => {
      let state: number = parseInt(res.is_exist_in_attendance_student);
      return this.isEnableAttendance = (state === 0) ? false : true;
    });
  }

  private async getLocationStudent() {
    let options: GeolocationOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 3600
    }
    
    const coordinates = await this._geolocation.getCurrentPosition(options);
    this.latOfStudent = coordinates.coords.latitude;
    this.longOfStudent = coordinates.coords.longitude;
  }

  private checkLeaveSession(leaveSession: number, subjectName: string) {
    if (leaveSession >= 3) {
      return this._sharedService.showAlert(`Môn ${subjectName}, bạn đã nghỉ ${leaveSession} buổi.`);
    }
  }

  public async onAttendanceGPS() {
    await this._sharedService.showLoading('Đang điểm danh...');

    if(!this.latOfStudent || !this.longOfStudent) {
      await this._sharedService.loading.dismiss();
      const MSG: string = 'GPS chưa bật, bạn nên kiểm tra lại!';
      return this._sharedService.showAlert(MSG, 'Cảnh báo hệ thống!');
    }

    this.teacherTatitude = this.infoDetailAttendance[0]?.latitude;
    this.teacherLongitude = this.infoDetailAttendance[0]?.longitude;
    this.radius = this.infoDetailAttendance[0]?.radius;
    let mets = this.convertPointToMets();
    
    if(mets <= +this.radius) {
      this.isEnableAttendance = true;
      return this.onUpdateStateAT();
    }
    await this._sharedService.loading.dismiss();
    const MSG: string = 'Không điểm danh được, bạn đang ngoài bán kính điểm danh!';
    return this._sharedService.showAlert(MSG);
  }

  private convertPointToMets(): number {
    this.teacherTatitude = +this.teacherTatitude;
    this.teacherLongitude = +this.teacherLongitude;

    let a: number = Math.sin(this.radian(this.teacherTatitude));
    let b: number = Math.sin(this.radian(this.latOfStudent));
    let c: number = Math.cos(this.radian(this.teacherTatitude));
    let d: number = Math.cos(this.radian(this.latOfStudent));
    let e: number = Math.cos(this.radian(this.longOfStudent - this.teacherLongitude));
    let met: number = Math.acos( a * b + c * d * e ) * 6371;
    return +(met * 1000).toFixed(2);
  }

  private radian(deg: number): number {
    return deg * (Math.PI / 180);
  }

  // cap nhat lai trang thai trong db
  private async onUpdateStateAT() {
    await this._sharedService.loading.dismiss();
    let state = await this._attendanceService.updateStateAttendance();
      this.subscription = state.subscribe((res: any) => {
        if (res.state == 1) {
          return this._sharedService.showAlert('Bạn đã điểm danh GPS thành công', 'Thông báo');
        }
        return this._sharedService.showAlert('Điểm danh GPS thất bại!', 'Cảnh báo');
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
