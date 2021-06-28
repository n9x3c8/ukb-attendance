import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AttendanceService } from 'src/app/shared/services/attendance.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'attendance-handmade-attendance',
  templateUrl: './handmade-attendance.page.html',
  styleUrls: ['./handmade-attendance.page.scss'],
})
export class HandmadeAttendancePage implements OnInit, OnDestroy {
  public atIdLast: number;

  public stateLoadData: boolean;
  
  public listHandMadeAT: IHandMadeAT[];

  private subscription: Subscription;

  constructor(
    private _activedRoute: ActivatedRoute,
    private _attendanceService: AttendanceService,
    private _sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getParamsURL();
    this.init();
    this.initHandMadeAT();
  }

  private init() {
    let existHandMadeAT$ = this._attendanceService.onCheckExistHandMadeAT(this.atIdLast);
    this.subscription = existHandMadeAT$.subscribe((res: any) => {
      let isExist: number = parseInt(res.is_exist_student_handmade);
      if(isExist === 1) {
        return this.stateLoadData = true;
      }
      return this.stateLoadData = false;
    });
  }

  private initHandMadeAT() {
    let listHandMadeAT$ = this._attendanceService.getListHandMadeAT(this.atIdLast);
    this.subscription = listHandMadeAT$.subscribe((res: IHandMadeAT[]) => {
      this.listHandMadeAT = [...res];
    });
  }

  public getParamsURL() {
    this.subscription = this._activedRoute.params.subscribe(param => {
      this.atIdLast = +param?.atIdLast;
    });
  }

  public onHandleConfirm(studentId: string, state: number, idx: number) {
      let updateState$ = this._attendanceService.updateStateWhenHandMade(studentId, state);
      this.subscription = updateState$.subscribe( (res: any) => {
        if(res.state !== -1) {
          this.listHandMadeAT.slice(idx, 1);
          this.initHandMadeAT();
          this._sharedService.showToast(`Cập nhật thành công`, 'success');
          return;
        }
        return;
      } );
  }
  

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

interface IHandMadeAT {
  student_id: string;
  student_name: string;
}