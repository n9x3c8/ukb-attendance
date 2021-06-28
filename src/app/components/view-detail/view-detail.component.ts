import { Component, Input, OnInit } from '@angular/core';
import { Notification } from 'src/app/shared/defined/notification.define';
import { IStudentTakeLeave } from 'src/app/shared/defined/student.define';

@Component({
    selector: 'attendance-view-detail',
    templateUrl: 'view-detail.component.html',
    styleUrls: ['view-detail.component.scss']
})
export class ViewDetailComponent implements OnInit {
    @Input('notificatonDetail') notificatonDetail: Notification;
    
    // sv xin nghi
    @Input('student') student: IStudentTakeLeave;

    constructor() {}

    ngOnInit() {}

}
