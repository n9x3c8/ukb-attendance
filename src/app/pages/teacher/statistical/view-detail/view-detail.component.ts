import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PDFGenerator, PDFGeneratorOptions } from '@ionic-native/pdf-generator/ngx';
import { DomainAPI } from 'src/app/shared/class/domain.class';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TeacherService } from 'src/app/shared/services/teacher.service';

@Component({
    selector: 'attendance-view-detail-comp',
    templateUrl: 'view-detail.component.html',
    styleUrls: ['view-detail.component.scss']
})
export class ViewDetailComponent extends DomainAPI implements OnInit {
    private currentPage: number;
    private length: number;
    private totalPage: number;

    public classId: string;
    public subjectId: string;
    public listStudentStatis: IStudentStatistical[];
    public detailLeaveDate: Map<string, IDetailLeaveData[]>;
    public totalSession: number;

    public html: string;
    public url: string;

    constructor(
        private _pdf: PDFGenerator,
        private _activatedRoute: ActivatedRoute,
        private _teacherService: TeacherService,
        private _sharedService: SharedService
    ) {
        super();
        this.currentPage = 1;
        this.length = 10;
        this.listStudentStatis = [];
        this.detailLeaveDate = new Map;
    }

    ngOnInit() {
        this._activatedRoute.params.subscribe(res => {
            this.classId = res?.classId;
            this.subjectId = res?.subjectId;
            this.totalSession = +res?.totalSession;
            this.url = `${this.domain}/mvc/public/images/`;
            this.getListStudent();
        });
    }

    public doRefresh(ev) {
        const complete = () => ev.target.complete();
        this.listStudentStatis = [];
        this.currentPage = 1;
        this.getListStudent(complete);
    }

    private async getListStudent(complete?: Function, pagination?: {currentPage: number, length: number}) {
        let currentDate: string = this._sharedService.getDatetime();
        let listStudentStatis$ = await this._teacherService.getStudentStatistical(this.classId, this.subjectId, currentDate, pagination);
        listStudentStatis$.subscribe((res: {total_page: number, data: IStudentStatistical[]}) => {
            if (res.data.length !== 0) {
                this.totalPage = res?.total_page;
                this.listStudentStatis = this.listStudentStatis.concat(res.data);
                if(typeof complete === 'function') {
                    complete();
                }
            }
        });
    }

    public loadData(ev) {
        const complete = () => ev.target.complete();
        if(this.currentPage < this.totalPage) {
            this.currentPage++;
            return this.getListStudent(complete, { currentPage: this.currentPage, length: this.length });
        }
        complete();
    }

    public async onViewDetailStudent(data: {id: string, count: string | null}) {
        if(data.count !== null) {
            let currentDate: string = this._sharedService.getDatetime();
            let listLeaveDate$ = await this._teacherService.getListLeaveDate(data.id, this.subjectId, currentDate);
            listLeaveDate$.subscribe((res: IDetailLeaveData[]) => {
                if(res.length !== 0) {
                    this.detailLeaveDate.set(data.id, res);
                }
            })
        }
    }

    public savePDF() {
        let options: PDFGeneratorOptions = {
            type: 'share',
            documentSize: 'A4'
        };

        this.html = document.getElementById('print').innerHTML;
        this._pdf.fromData(this.html, options);
    }
}


interface IStudentStatistical {
    count: string | null;
    student_id: string;
    student_name: string;
    student_birthday: string;
    student_avatar: string;
    student_gender: number;
}

interface IDetailLeaveData {
    student_id: string;
    is_enable: string;
    leave_date: string;
    leave_reason: string;
}