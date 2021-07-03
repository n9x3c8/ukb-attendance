import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PDFGenerator, PDFGeneratorOptions } from '@ionic-native/pdf-generator/ngx';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TeacherService } from 'src/app/shared/services/teacher.service';

@Component({
    selector: 'attendance-view-detail-comp',
    templateUrl: 'view-detail.component.html',
    styleUrls: ['view-detail.component.scss']
})
export class ViewDetailComponent implements OnInit {
    public classId: string;
    public subjectId: string;
    public listStudentStatis: IStudentStatistical[] = [];
    public totalSession: number;
    public html: string;

    constructor(
        private _pdf: PDFGenerator,
        private _activatedRoute: ActivatedRoute,
        private _teacherService: TeacherService,
        private _sharedService: SharedService
    ) { }

    ngOnInit() {
        this._activatedRoute.params.subscribe(res => {
            this.classId = res?.classId;
            this.subjectId = res?.subjectId;
            this.totalSession = +res?.totalSession;
            this.getListStudent();
        });
    }

    private async getListStudent() {
        let currentDate: string = this._sharedService.getDatetime();
        let listStudentStatis$ = await this._teacherService.getStudentStatistical(this.classId, this.subjectId, currentDate);
        listStudentStatis$.subscribe((res: IStudentStatistical[]) => {
            if (res.length !== 0) {
                this.listStudentStatis = [...res];
            }
        });
    }

    public async onViewDetailStudent(data: {id: string, count: string | null}) {
        if(data.count !== null) {
            let currentDate: string = this._sharedService.getDatetime();
            let listLeaveDate$ = await this._teacherService.getListLeaveDate(data.id, this.subjectId, currentDate);
            listLeaveDate$.subscribe(res => {
                console.log(res);
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
}