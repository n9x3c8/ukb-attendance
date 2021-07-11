import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Inofification } from "src/app/shared/defined/notification.define";
import { StudentService } from "src/app/shared/services/student.service";

@Component({
    selector: 'attendance-student',
    templateUrl: 'student.component.html',
    styleUrls: ['student.component.scss']
})
export class StudentComponent implements OnInit, OnDestroy {
    public notifications: Inofification[] = [];
    public subscription: Subscription;
    public count: number = 0;
    
    constructor(
        private _activedRoute: ActivatedRoute,
        private _studentService: StudentService
    ) { }

    ngOnInit() {
        this.onHandleGetNotifications();
        this.init();
    }

    public async onHandleGetNotifications() {
        let notify$ = await this._studentService.notifications();
        notify$.subscribe((res: Inofification[]) => {
            if (res) {
                this.notifications = res.filter((notification: any) => {
                    return notification?.is_seen == 0;
                });
                return;
            }
            return this.notifications = [];
        });

    }

    private init() {
        this.subscription = this._activedRoute.queryParamMap
        .subscribe((param: any) => {
            let state: string = param.params.state;
            if(state !== undefined) {
                this.notifications.shift();
            }
            return;
        })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
