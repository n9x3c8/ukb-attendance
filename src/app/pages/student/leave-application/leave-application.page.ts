import { Component, OnDestroy } from '@angular/core';
import { ModalController, ViewDidEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ILeaveApplication } from 'src/app/shared/defined/student.define';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { FormUpdateComponent } from './form-update/form-update.component';

@Component({
  selector: 'attendance-leave-application',
  templateUrl: './leave-application.page.html',
  styleUrls: ['./leave-application.page.scss'],
})
export class LeaveApplicationPage implements ViewDidEnter, OnDestroy {
  public listLeaveApp: ILeaveApplication[];
  private subscription: Subscription;

  constructor(
    private _modalCtrl: ModalController,
    private _sharedService: SharedService,
    private _studentService: StudentService
  ) { }

  ionViewDidEnter() {
    this.init();
  }

  private async init() {
    let currentTime: string = this._sharedService.getDatetime();

    let listLeaveApp$ = await this._studentService.getListLeaveApplication(currentTime);
    this.subscription = listLeaveApp$.subscribe((res: ILeaveApplication[]) => {
      if(res.length !== 0) this.listLeaveApp = [...res];
    });
  }

  public onHandleEdit(itemTakeLeave: ILeaveApplication, idx: number) {
    let currentDateTime: string = this._sharedService.getCurrentTime();
    let leaveId: number = +itemTakeLeave.leave_id_leaves;
    this.goToFormUpdate(leaveId, itemTakeLeave, currentDateTime, idx);
  }

  private async goToFormUpdate(leaveId: number, itemTakeLeave: ILeaveApplication, currentDateTime: string, idx: number) {
    const modal = await this._modalCtrl.create({
      component: FormUpdateComponent,
      componentProps: { itemTakeLeave }
    });
    await modal.present();

    // nhan du lieu tu form update
    const data = await modal.onDidDismiss();

    if(data.data) {
      let leaveTime: string = data.data.date;
      let reason: string = data.data.leave_reason;

      let editTakeLeave$ = await this._studentService.updateTakeLeave(leaveId, currentDateTime, reason, leaveTime);
      this.subscription = editTakeLeave$.subscribe((res: {state: number}) => {
        
        if(res.state !== -1) {
          this.listLeaveApp[idx].take_leave_date = leaveTime;
          this.listLeaveApp[idx].leave_reason = reason;
          return this._sharedService.showToast('Cập nhật đơn xin nghỉ thành công!', 'success');
        }
        return this._sharedService.showToast('Cập nhật đơn xin nghỉ không thành công!', 'danger');
      });
    } 
    return;
  }

  public async onHandleDel(leave_id_leaves: string, idx: number) {
    let removeTakeLeave$ = await this._studentService.removeTakeLeave(+leave_id_leaves);
    this.subscription = removeTakeLeave$.subscribe((res: {state: number}) => {
      if(res.state !== -1) {
        this.listLeaveApp.splice(idx, 1);
        return this._sharedService.showToast('Xóa đơn xin nghỉ thành công!', 'success');
      }
      return this._sharedService.showToast('Xóa đơn xin nghỉ không thành công!', 'danger');
    });
  }


  trackByFn(index: number, name: any): number {
    return index;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
