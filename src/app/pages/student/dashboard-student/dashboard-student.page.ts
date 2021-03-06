import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ViewDidEnter } from '@ionic/angular';
import { App } from '@capacitor/app';
import { AccountService } from '../../../shared/services/account.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { AttendanceService } from 'src/app/shared/services/attendance.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { DomainAPI } from 'src/app/shared/class/domain.class';
import { StorageService } from 'src/app/shared/services/storage.service';


@Component({
  selector: 'attendance-attendance',
  templateUrl: 'dashboard-student.page.html',
  styleUrls: ['dashboard-student.page.scss'],
})
export class DashboardStudentPage extends DomainAPI implements OnInit, ViewDidEnter {
  public student;
  public avatar: string;
  public infoAttendance: any[];
  public notifications: any[];
  public countNewNotify: number;
  constructor(
    private _router: Router,
    private _actionSheetController: ActionSheetController,
    private _storageService: StorageService,
    private _accountService: AccountService,
    private _attendanceService: AttendanceService,
    private _studentService: StudentService,
    private _sharedService: SharedService
  ) {
    super();
  }


  async ngOnInit() {
    await this.checkLogged();
  }

  ionViewDidEnter() {
    this.getInfoStudent();
    this.init();
  }

  public async init() {
    // //get notifications
    let notify$ = await this._studentService.notifications();
    notify$.subscribe((res: any) => {
      if (res) {
        this.notifications = [...res];
        this.countNewNotify = res.filter((notification: any) => {
          return notification?.is_seen == 0;
        }).length;
        return;
      }
      return this.notifications = [];
    });

    // load info attendance
    let currentDate: string = this._sharedService.getDatetime();
    const infoAttendance$ = await this._attendanceService.getInfoDetailsAttendance(currentDate);
    infoAttendance$
    .subscribe((res: any) => {
      if(res?.length !== 0) {
        this.infoAttendance = [...res];
      }      
    });
  }

  private async getInfoStudent() {
    const infoStudent$ = await this._studentService.infoStudent();
    infoStudent$
    .subscribe((res: any) => {
      if (res.length !== 0) {
        this.student = res[0];
        if(!this.student?.student_avatar) {
          return this.avatar = this.student?.student_gender == 1 ? 'assets/images/avatar-male.webp' : 'assets/images/avatar-female.webp';
        }
        return this.avatar = `${this.domain}/mvc/public/images/${this.student?.student_avatar}`;
      }
    });
  }

  //Attendance GPS
  async onAttendanceGPS() {
    let state$ = await this._attendanceService.isExistInRoom();
    state$.subscribe(async (res: any) => {
      if (res[0].state == 1) {
        return this._router.navigate(['student', 'attendance-gps']);
      }
      this._sharedService.showToast('Kh??ng c?? l???p h???c n??o', 'danger');
    });
  }

  private async checkLogged() {
    let isLogged = await this._storageService.get('logged');
    if(!isLogged) {
      let msgAgree: string = `<strong>B???n c?? mu???n l??u m???t kh???u?</strong><br> L???n v??o ???ng d???ng k??? ti???p s??? kh??ng c???n ph???i ????ng nh???p l???i.`;
      let msgCancel: string = 'Kh??ng l??u m???t kh???u!';
      const savePassword: Function = () => this._storageService.set('logged', 1);
      return this._sharedService.showAlert(msgAgree, 'L??u m???t kh???u', savePassword, msgCancel);
    }
  }

  public async openMenu() {
    const actionSheet = await this._actionSheetController.create({
      buttons: [{
        text: '?????i m???t kh???u',
        icon: 'key-outline',
        handler: () => {
          this._sharedService.showToast('??ang ph??t tri???n', 'danger');
        }
      }, {
        text: '????ng Xu???t',
        icon: 'log-out-outline',
        handler: () => this.onLogout()
      }, {
        text: 'H???y',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    return await actionSheet.present();
  }

  public onLogout() {
    this._accountService.logout();
  }
}
