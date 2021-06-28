import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TeacherService } from 'src/app/shared/services/teacher.service';
import { PrintComponent } from '../print/print.component';

@Component({
    selector: 'attendance-view-detail-comp',
    templateUrl: 'view-detail.component.html',
    styleUrls: ['view-detail.component.scss']
})
export class ViewDetailComponent implements OnInit{
    public classId: string;
    public subjectId: string;
    public listStudentStatis: any[] = [];
    public totalSession: number;
    constructor(
        private _modal: ModalController,
        private _activatedRoute: ActivatedRoute,
        private _teacherService: TeacherService,
        private _sharedService: SharedService
    ) {}

    ngOnInit() {
        this._activatedRoute.params.subscribe(res => {
            this.classId = res?.classId;
            this.subjectId = res?.subjectId;
            this.totalSession = +res?.totalSession;
            this.getListStudent();
        });
    }

    private getListStudent() {
        let currentDate: string = this._sharedService.getDatetime();
        let listStudentStatis$ = this._teacherService.getStudentStatistical(this.classId, this.subjectId, currentDate);
        listStudentStatis$.subscribe((res: any[]) => {
            if(res.length !== 0) {
                this.listStudentStatis = [...res];
            }
        });
    }

    public async onPrint() {
        const modal = await this._modal.create({
            component: PrintComponent,
            componentProps: {
                students: this.listStudentStatis,
                classId: this.classId
            }
        });
        return modal.present();
    }
}
