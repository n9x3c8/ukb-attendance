import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IstatisticalStudent } from "src/app/shared/defined/statistical.define";
import { SharedService } from "src/app/shared/services/shared.service";
import { StudentService } from "src/app/shared/services/student.service";

@Component({
    selector: 'attendance-statistical-student',
    templateUrl: 'statistical.page.html',
    styleUrls: ['statistical.page.scss']
})
export class StatisticalPage implements OnInit, OnDestroy{

    private subscription: Subscription;
    public infoStatistical: IstatisticalStudent[];

    constructor(
        private _studentService: StudentService,
        private _sharedService: SharedService
    ) {}

    ngOnInit() {
        this.init();
    }

    private async init() {
        let dateTime: string = this._sharedService.getDatetime();
        let studentStatistical$ = await this._studentService.getStudentDetail(dateTime);
        this.subscription = studentStatistical$.subscribe((res: IstatisticalStudent[]) => {
            if( res.length !== 0) {
                this.infoStatistical = [...res];
                return;
            }
            return;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }




}
