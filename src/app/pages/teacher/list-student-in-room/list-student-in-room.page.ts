import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { IinfoStateAT, Ipagination } from "src/app/shared/defined/info.define";
import { AttendanceService } from "src/app/shared/services/attendance.service";
import { SharedService } from "src/app/shared/services/shared.service";
import { TeacherService } from "src/app/shared/services/teacher.service";

@Component({
    selector: 'attendance-list-student-in-room',
    templateUrl: 'list-student-in-room.page.html',
    styleUrls: ['list-student-in-room.page.scss']
})
export class ListStudentInRoomPage implements OnInit, OnDestroy {
    private currentPage: number;
    private length: number;
    private totalPage: number;
    private subscription: Subscription;
    public listStudent: any[];
    public selectedType: string;
    public cb: Function;
    public classId: string;
    public subjectId: string;
    public isUpdate: boolean;
    public currentTime: string;


    constructor(
        private _router: Router,
        private _activedRoute: ActivatedRoute,
        private _activedRouter: ActivatedRoute,
        private _attendanceService: AttendanceService,
        private _sharedService: SharedService,
        private _teacherService: TeacherService,
    ) {
        this.listStudent = [];
        this.selectedType = 'all';
        this.cb = () => { };
        this.currentPage = 1;
        this.length = 10;
    }

    ngOnInit() {
        this.init();
    }

    private async init() {
        await this._sharedService.showLoading('Xin chờ...');
        this.currentTime = this._sharedService.getDatetime();
        let info = await this._attendanceService.getInfoStateAttendance(this.currentTime);
        this.subscription = info.subscribe(async (res: IinfoStateAT) => {
            let hours: number = (new Date).getHours();

            this.classId = res?.infoClass.class_id;
            this.subjectId = res?.infoSubject.subject_id;

            const HOURS_INVALID: boolean = hours >= 8 && hours <= 16;
            const IS_START_AT: boolean = !res?.infoClass.class_id;

            if (IS_START_AT && HOURS_INVALID) {
                this.getAllStudent(this.classId, this.subjectId, this.currentTime);
                this._sharedService.loading.dismiss();
            }
            if (this.selectedType === 'all') {
                this.getAllStudent(this.classId, this.subjectId, this.currentTime);
                this._sharedService.loading.dismiss();
            }
        });
    }

    public doRefresh(ev) {
        this.listStudent = [];
        this.currentPage = 1;
        this.currentTime = this._sharedService.getDatetime();
        const complete = () => ev.target.complete();
        
        this._activedRoute.queryParams.subscribe(param => {
            const { filter } = param;
            if(filter === 'with-out-permission') {
                this.cb = async (classId: string, subjectId: string, currentTime: string) => {
                    const data = await this._teacherService.getListStudentWithoutPermission(classId, subjectId, currentTime);
                    this.subscription = data.subscribe((res: any) => {
                        if (res) {
                            this.setQueryParam('with-out-permission');
                            this.listStudent = [...res];
                            this.isUpdate = true;
                        }
                        return;
                    });
                }
                this.cb(this.classId, this.subjectId, this.currentTime);
                complete();
            }
            this.getAllStudent(this.classId, this.subjectId, this.currentTime, complete);
        })

    }

    public loadData(ev) {
        if (this.currentPage < this.totalPage) {
            this.currentPage++;
            let pagination: Ipagination = {
                currentPage: this.currentPage,
                length: this.length
            }
            const complete = () => ev.target.complete();
            return this.getAllStudent(this.classId, this.subjectId, this.currentTime, complete, pagination);
        }
        ev.target.complete();
    }

    private async getAllStudent(classId: string, subjectId: string, currentTime: string, complete?: Function, pagination?: Ipagination) {
        let listStudent = await this._teacherService.getListStudent(classId, subjectId, currentTime, pagination);
        listStudent.subscribe((res: any) => {
            this.totalPage = res.total_page;
            this.listStudent = this.listStudent.concat(res.data);
            if (typeof complete === 'function') {
                complete();
            }
        });
    }

    //xem chi tiet thong tin sv
    public async onViewDetailByID(student: any) {
        let studentName = student.student_name;
        let leaveSession: number = parseInt(student.leave_session);
        if (leaveSession >= 2) {
            return this._sharedService.showToast(`CẢNH BÁO: ${studentName} đã nghỉ ${leaveSession} buổi!`, 'danger', 'middle');
        }
        return;
    }


    public async onChangeState(value: string) {
        await this._sharedService.showLoading('Xin chờ...');

        if (value === 'all') {
            this.listStudent = [];
            this.getAllStudent(this.classId, this.subjectId, this.currentTime);
            this.isUpdate = false;
            this._sharedService.loading.dismiss();
        }


        if (value === 'agree') {
            this.isUpdate = false;
            this.cb = async (classId: string, subjectId: string, currentTime: string) => {
                const data = await this._teacherService.getListStudentLeavePermissionAgree(classId, subjectId, currentTime);
                this.subscription = data.subscribe((res: any) => {
                    if (res) this.listStudent = [...res];
                    return;
                });
            }
            this.cb(this.classId, this.subjectId, this.currentTime);
            this._sharedService.loading.dismiss();
        }

        if (value === 'denine') {
            this.cb = async (classId: string, subjectId: string, currentTime: string) => {
                const data = await this._teacherService.getListStudentLeavePermissionDenine(classId, subjectId, currentTime);
                this.subscription = data.subscribe((res: any) => {
                    if (res) this.listStudent = [...res];
                    return;
                });
            }
            this.cb(this.classId, this.subjectId, this.currentTime);
            this._sharedService.loading.dismiss();
        }

        if (value === 'withoutPermission') {
            this.cb = async (classId: string, subjectId: string, currentTime: string) => {
                const data = await this._teacherService.getListStudentWithoutPermission(classId, subjectId, currentTime);
                this.subscription = data.subscribe((res: any) => {
                    if (res) {
                        this.setQueryParam('with-out-permission');
                        this.listStudent = [...res];
                        this.isUpdate = true;
                    }
                    return;
                });
            }
            this.cb(this.classId, this.subjectId, this.currentTime);
            this._sharedService.loading.dismiss();
        }
    }


    public onUpdateStateStudent(student: any, index: any) {

        let currentDate: string = this._sharedService.getDatetime();
        this.subscription = this._activedRouter.paramMap.subscribe( async (param: any) => {
            const { subjectId } = param.params;
            let studentId = student?.student_id;
            let delWithout = await this._teacherService.deleteWithoutLeave(studentId, subjectId, currentDate);
            this.subscription = delWithout.subscribe((res: any) => {
                if (res.state == 1) {
                    this.listStudent.splice(index, 1);
                    return this._sharedService.showToast("Cập nhâp thành công !!!", "success");
                }
                return this._sharedService.showToast("Câp nhập thất bại!!!", "danger");
            });

        })

    }

    private setQueryParam(value: string) {
        this._router.navigate([], {
            queryParams: { filter: value }
        });
    }

    public trackByFn(index: number, student: any): number {
        return student?.student_id;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}