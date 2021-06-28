import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Istatistical } from "src/app/shared/defined/statistical.define";
import { SharedService } from "src/app/shared/services/shared.service";
import { TeacherService } from "src/app/shared/services/teacher.service";


@Component({
    selector: 'attendance-statistical',
    templateUrl: 'statistical.page.html',
    styleUrls: ['statistical.page.scss']
})
export class StatisticalPage implements OnInit, OnDestroy {
    private subscription: Subscription;
    public infoStatistical: Istatistical[];
    constructor(
        private _router: Router,
        private readonly _teacherService: TeacherService,
        private readonly _sharedService: SharedService
    ) { }

    ngOnInit() {
        this.init();
    }

    public async init() {
        await this._sharedService.showLoading('Xin chờ...');
        let year: number = (new Date).getFullYear();
        let statistical = await this._teacherService.statistical(year);
        this.subscription = statistical.subscribe((res: any) => {
            if(res.state !== -1) {
                this._sharedService.loading.dismiss();
                this.infoStatistical = [...res];
                return;
            }
            this._sharedService.loading.dismiss();
            return;
        });
    }

    public onViewDetail(classId: string, subjectId: string, subjectCredit: string) {
        let totalSession: number = subjectCredit == '3' ? 12 : 8;
        return this._router.navigate(['teacher', 'view-detail-statistical', classId, subjectId, totalSession]);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
