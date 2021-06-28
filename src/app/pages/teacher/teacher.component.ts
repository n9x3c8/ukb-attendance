import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription, timer } from "rxjs";
import { IStudentTakeLeave } from "src/app/shared/defined/student.define";
import { SharedService } from "src/app/shared/services/shared.service";
import { TeacherService } from "src/app/shared/services/teacher.service";

@Component({
    selector: 'attendance-teacher-comp',
    templateUrl: 'teacher.component.html',
    styleUrls: ['teacher.component.scss']
})
export class TeacherComponent implements OnInit, OnDestroy {
    public studentTakeLeave: IStudentTakeLeave[];
    public subscription: Subscription;
    constructor(
        private _activedRoute: ActivatedRoute,
        private _sharedService: SharedService,
        private _teacherService: TeacherService
    ) {}

    ngOnInit() {
        this.init();
        this.processParam();
    }

    private async init() {
        let currentTime: string = this._sharedService.getDatetime();
        let listStudent$ = await this._teacherService.listStudentTakeLeave(currentTime);
        this.subscription = listStudent$.subscribe((res: any) => {
            if (res) {
                this.studentTakeLeave = [...res];
                return;
            }
        });
    }

    private processParam() {
        this.subscription = this._activedRoute.queryParamMap.subscribe((param: any) => {
            let state: string = param.params.state;
            if(state) {
                return this.studentTakeLeave.shift();
            }
            return;
        })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
