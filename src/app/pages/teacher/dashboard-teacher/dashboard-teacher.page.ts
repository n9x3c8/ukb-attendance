import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { Subscription } from 'rxjs';
import { IinfoStateAT } from 'src/app/shared/defined/info.define';
import { TeacherService } from 'src/app/shared/services/teacher.service';
import { AttendanceService } from 'src/app/shared/services/attendance.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ActionSheetController, ViewDidEnter } from '@ionic/angular';
import { NavigationOptions } from '@ionic/angular/providers/nav-controller';
import { DomainAPI } from 'src/app/shared/class/domain.class';

@Component({
  selector: 'attendance-dashboard-teacher',
  templateUrl: 'dashboard-teacher.page.html',
  styleUrls: ['dashboard-teacher.page.scss'],
})
export class DashboardTeacherPage extends DomainAPI implements OnInit, OnDestroy, ViewDidEnter {
  private subscription: Subscription;
  public stateEnableAttendance: number;
  public teacher: any;
  public avatarUrl: string;
  public info: IinfoStateAT;

  constructor(
    private _router: Router,
    private _accountService: AccountService,
    private _sharedService: SharedService,
    private _actionSheetController: ActionSheetController,
    private _storageService: StorageService,
    private readonly _teacherService: TeacherService,
    private readonly _attendanceService: AttendanceService,
  ) {
    super();
  }

  async ngOnInit() {
    this.checkLogged();
  }

  ionViewDidEnter() {
    this.getInfoTeacher();
    this.getInfoStateAT();
  }

  private async checkLogged() {
    let isLogged = await this._storageService.get('logged');
    if(!isLogged) {
      let msgAgree: string = `<strong>Thầy/Cô có muốn lưu mật khẩu?</strong><br> Lần vào ứng dụng kế tiếp sẽ không cần phải đăng nhập lại.`;
      let msgCancel: string = 'Không lưu mật khẩu!';
      const savePassword: Function = () => this._storageService.set('logged', 2);
      return this._sharedService.showAlert(msgAgree, 'Lưu mật khẩu', savePassword, msgCancel);
    }
  }

  // Da xu ly trang thai, neu la 3 thi ko cho phep vao diem danh
  async openTurnOnAttendance() {
    await this._sharedService.showLoading('Xin chờ...');
    let currentTime: string = this._sharedService.getDatetime();
    let info = await this._attendanceService.getInfoStateAttendance(currentTime);
    this.subscription = info.subscribe(async (res: IinfoStateAT) => {
      let timeserver: number = res.timeserver;

      let count: number = parseInt(res.count_number_session);
      
      let state = this._attendanceService.stateAttendance(count, res, timeserver);
      state.then(async (res: any) => {
        this.branchAT(res);
      })
    });
  }

  // 1 chua bat diem danh | 2 da bat diem danh | 3 ngoai gio diem danh
  private branchAT(res: any) {
    this.stateEnableAttendance = res?.state;
    if (this.stateEnableAttendance === 3) {
      this._sharedService.loading.dismiss();
      this._sharedService.showToast('Bạn đang ngoài giờ diểm danh', 'danger');
      return;
    }

    if (this.stateEnableAttendance === 2) {
      this.checkAT(res);
      return;
    }

    if (this.stateEnableAttendance === 1) {
      this.goToATOption();
      return;
    }
  }


  // kiem tra xem da tat diem danh hay chua | state = 1 la chua tat
  private async checkAT(res?: any) {
    let atIdLast: number = this.info?.attendance_id_last;
    
    let checkOff$ = await this._attendanceService.checkOffAttendance(atIdLast);
    this.subscription = checkOff$.subscribe(async (res: { state: number }) => {
      let state: number = res.state;      

      // chua tat diem danh
      if (state === 1) {
        return this.goToATOption();
      }
      await this._sharedService.loading.dismiss();
      return this._sharedService.showToast('Thầy/Cô đã tắt điểm danh rồi!!!', 'danger');
    });

  }

  private async goToATOption() {
    await this._sharedService.loading.dismiss();
    let options: NavigationOptions = {
      queryParams: {atIdLast: this.info?.attendance_id_last}
    }
    this._router.navigate(['teacher/attendance-options'], {
      queryParams: { atIdLast: this.info?.attendance_id_last }
    });
  }

  private async getInfoTeacher() {
    await (await this._teacherService.infoTeacher()).subscribe((res: any) => {
      if(!res) {
        return this._sharedService.showToast('Có lỗi xảy ra!', 'danger');
      }
      this.teacher = { ...res[0] };
      let url = `${this.domain}/mvc/public/images/${this.teacher?.teacher_avatar}`;
      this.avatarUrl = !this.teacher?.teacher_avatar ? this.teacher?.teacher_gender === 1 ? 'assets/images/teacher-male.webp' : 'assets/images/teacher-female.webp' : url;
    });
  }

  private async getInfoStateAT() {
    let currentTime: string = this._sharedService.getDatetime();
    let info$ = await this._attendanceService.getInfoStateAttendance(currentTime);
    this.subscription = info$.subscribe((res: IinfoStateAT) => {
      this.info = { ...res };
    });
  }

  public onGotoHandMadeAT() {
    this.goToGeneratorQR();
    return;
    let attendanceIdLast: number = this.info?.attendance_id_last;
    let classId: string = this.info.infoClass.class_id;
    let subjectId: string = this.info.infoSubject.subject_id;
    if(!classId || !subjectId) {
      return this._sharedService.showToast('Thầy/Cô chưa bật điểm danh!', 'danger');
    }
    return this._router.navigate(['teacher/handmade-at', attendanceIdLast]);
  }

  public goToGeneratorQR() {
    return this._sharedService.showAlert('Chức năng đang được phát triển', 'Thông báo');
    // this._router.navigate(['teacher', 'qr-generator']);
  }

  public onGoToListStudentInRoom() {
    let subjectId: string = this.info?.infoSubject?.subject_id;
    let atIdLast: number = this.info.attendance_id_last;
    
    if(atIdLast) {
      return this._router.navigate(['teacher', 'list-student-in-room', atIdLast, subjectId]);
    }
    return this._sharedService.showToast(`Thầy/cô chưa bật điểm danh`, 'danger');  
  }

  public async openMenu() {
    const actionSheet = await this._actionSheetController.create({
      buttons: [{
        text: 'Đổi mật khẩu',
        icon: 'key-outline',
        handler: () => {
          this._sharedService.showToast('Đang phát triển', 'danger');
        }
      }, {
        text: 'Đăng Xuất',
        icon: 'log-out-outline',
        handler: () => this.onLogout()
      }, {
        text: 'Reset',
        icon: 'log-out-outline',
        handler: () => this.onReset()
      },
       {
        text: 'Hủy',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    return await actionSheet.present();
  }

  onReset() {
    this._accountService.reset().subscribe(() => {
      this._sharedService.showToast('Reset thành công!', 'success');
    })
  }

  public async onLogout() {
    await this._sharedService.showLoading('Đăng xuất...');
    await this._accountService.logout();
    await this._sharedService.loading.dismiss();
    await this._router.navigate(['login']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
