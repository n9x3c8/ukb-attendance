import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { IinfoStateAT, IOptionsFilter, Ipagination } from "src/app/shared/defined/info.define";
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
    public classId: string;
    public subjectId: string;
    public isUpdate: boolean;
    public currentTime: string;

    public options: any;

    constructor(
        private _router: Router,
        private _navCtrl: NavController,
        private _activedRoute: ActivatedRoute,
        private _attendanceService: AttendanceService,
        private _sharedService: SharedService,
        private _teacherService: TeacherService,
    ) {
        this.listStudent = [];
        this.currentPage = 1;
        this.length = 10;
        this.options = [
            {
                value: 'all',
                text: 'Tất cả'
            },
            {
                value: 'agree',
                text: 'Đồng ý'
            },
            {
                value: 'denine',
                text: 'Từ chối'
            },
            {
                value: 'without-permission',
                text: 'Nghỉ không phép'
            }
        ];
    }

    ngOnInit() {
        this.init();
    }

    private async init() {
        this.currentTime = this._sharedService.getDatetime();
        let info = await this._attendanceService.getInfoStateAttendance(this.currentTime);
        this.subscription = info.subscribe(async (res: IinfoStateAT) => {
            let hours: number = (new Date).getHours();

            this.classId = res?.infoClass.class_id;
            this.subjectId = res?.infoSubject.subject_id;


            const HOURS_INVALID: boolean = hours >= 8 && hours <= 16 || true;
            const IS_START_AT = res?.infoClass.class_id;

            if (IS_START_AT && HOURS_INVALID) {
                this.getAllStudent(this.classId, this.subjectId, this.currentTime);
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
            if (filter === 'agree') {
                this.filterAgree();
                return complete();
            }

            if (filter === 'denine') {
                this.filterDenine();
                return complete();
            }

            if (filter === 'without-permission') {
                this.isUpdate = true;
                this.filterWithoutPermission();
                return complete();
            }
            return this.getAllStudent(this.classId, this.subjectId, this.currentTime, complete);
        })
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

    //xem chi tiet thong tin sv
    public async onViewDetailByID(student: any) {
        let studentName = student.student_name;
        let leaveSession: number = parseInt(student.leave_session);
        if (leaveSession >= 2) {
            return this._sharedService.showToast(`CẢNH BÁO: ${studentName} đã nghỉ ${leaveSession} buổi!`, 'danger', 'middle');
        }
        return;
    }


    public onFilter(ev) {
        const { value } = ev.detail;
        this.listStudent = [];
        if (value === 'all') {
            this.isUpdate = false;
            this.setQueryParam();
            return this.getAllStudent(this.classId, this.subjectId, this.currentTime);
        }

        if (value === 'agree') {
            this.setQueryParam('agree');
            return this.filterAgree();
        }

        if (value === 'denine') {
            this.setQueryParam('denine');
            return this.filterDenine();
        }
        this.isUpdate = false;
        this.setQueryParam('without-permission');
        return this.filterWithoutPermission();
    }

    private async filterListStudent(options: IOptionsFilter) {
        let filterStudents$ = await this._teacherService.getStudentsByOptions(options);
        this.subscription = filterStudents$.subscribe((res: any[]) => {
            if (res?.length) {
                this.listStudent = [...res];
            }
        });
    }

    private filterAgree() {
        let options: IOptionsFilter = {
            classId: this.classId,
            subjectId: this.subjectId,
            currentDate: this.currentTime,
            isEnable: 1,
            leave_denine: ''
        };
        return this.filterListStudent(options);
    }
    
    private filterDenine() {
        let options: IOptionsFilter = {
            classId: this.classId,
            subjectId: this.subjectId,
            currentDate: this.currentTime,
            isEnable: 0,
            leave_denine: 'NOT'
        };
        return this.filterListStudent(options);
    }

    private filterWithoutPermission() {
        let options: IOptionsFilter = {
            classId: this.classId,
            subjectId: this.subjectId,
            currentDate: this.currentTime,
            isEnable: 0,
            leave_denine: ''
        };
        this.isUpdate = true;
        return this.filterListStudent(options);
    }


    public async onUpdateStateStudent(student: any, index: any) {
        let currentDate: string = this._sharedService.getDatetime();
        let studentId = student?.student_id;
        let delWithout = await this._teacherService.deleteWithoutLeave(studentId, this.subjectId, currentDate);
        this.subscription = delWithout.subscribe((res: any) => {
            if (res.state == 1) {
                this.listStudent.splice(index, 1);
                return this._sharedService.showToast("Cập nhâp thành công !!!", "success");
            }
            return this._sharedService.showToast("Câp nhập thất bại!!!", "danger");
        });
    }

    public onGoBack() {
        this._navCtrl.pop();
    }

    private setQueryParam(value?: string) {
        if(value) {
            return this._router.navigate([], {
                queryParams: { filter: value }
            });
        }
        this._navCtrl.navigateForward('teacher/list-student-in-room');
        // this._navCtrl.navigateForward('teacher/list-student-in-room', {queryParams: {filter: value}});
    }
    
    public trackByFn(index: number, student: any): number {
        return student?.student_id;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}


