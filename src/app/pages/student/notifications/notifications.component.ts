import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ViewDidEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ViewDetailComponent } from 'src/app/components/view-detail/view-detail.component';
import { Notification } from 'src/app/shared/defined/notification.define';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StudentService } from 'src/app/shared/services/student.service';
@Component({
  selector: 'attendance-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements ViewDidEnter, OnDestroy {
  public idx: number;
  public notifications: Notification[];
  public countNewNotify: number;
  public subscription: Subscription;
  constructor(
    private _router: Router,
    private _modal: ModalController,
    private _studentService: StudentService,
    private _sharedService: SharedService
  ) {
    this.notifications = [];
  }

  ionViewDidEnter() {
    this.init();
  }

  public async init() {
    
     // //get notifications
     let notify$ = await this._studentService.notifications();
     this.subscription = notify$.subscribe((res: any[]) => {
       if (Array.isArray(res) && res.length !== 0) {
         this.notifications = [...res];
         this.countNewNotify = res.filter((notification: any) => {
           return notification?.is_seen == 0;
         }).length;
         return;
       }
       return this._sharedService.showToast('Không có thông báo nào!', 'danger');
     });
  }

  public async onViewDetail(notificaton: Notification, idx: number) {
    if(notificaton?.is_seen === '1') {
      return this.modalDetail(notificaton, idx);
    }
    
    const listLeaveId: number = parseInt(notificaton?.list_leave_id);
    let update$ = await this._studentService.updateSeenNotify(listLeaveId);
    this.subscription = update$.subscribe((res: { state: number }) => {
      if (res.state !== -1) {
        this.setQueryParam(idx);
        return this.modalDetail(notificaton, idx);
      }
      return;
    });

  }

  private async modalDetail(data: Notification, idx: number) {
    this.notifications[idx].is_seen = '1';
    this.idx = idx;
    const modal = await this._modal.create({
      component: ViewDetailComponent,
      componentProps: {
        notificatonDetail: data
      },
      cssClass: 'custom-view-detail',
    });
    return await modal.present();
  }

  public onGotoDashBoard() {
    return this._router.navigate(['student', 'dashboard']);
  }

  private setQueryParam(value: number) {
    this._router.navigate([], {
        queryParams: {state: value}
    });
  }

  public onHandleNoData(ev: boolean) {
    if(ev) {
      return this.init();
    }
  }

  trackByFn(index: number, name: any): number {
    return index;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    return this._modal.dismiss()
    .catch(err => this.subscription.unsubscribe() );
  }

}
