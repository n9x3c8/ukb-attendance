import { Component, Input, OnInit } from "@angular/core";
import { IonTextarea, ModalController } from "@ionic/angular";
import { ILeaveApplication } from "src/app/shared/defined/student.define";
import { SharedService } from "src/app/shared/services/shared.service";

@Component({
    selector: 'attendance-update-form',
    templateUrl: 'form-update.component.html',
    styleUrls: ['form-update.component.scss']
})
export class FormUpdateComponent implements OnInit {
    public year: string;
    public month: string;
    public d: string;
    public date: string;

    @Input('itemTakeLeave') itemTakeLeave: ILeaveApplication;

    constructor(
        private _modalCtrl: ModalController,
        private _sharedService: SharedService
    ) {}

    ngOnInit() {
        this.date = this.itemTakeLeave?.take_leave_date;
    }

    getTakeLeaveDateTime(v) {
        let date = v.detail.value;
        let datetime = date.slice(0, 10);
        let time = datetime.split('-');
        this.year = time[0];
        this.month = time[1];
        this.d = time[2];
        this.date = `${this.year}-${this.month}-${this.d}`;
    }

    onUpdateTakeLeave(takeReason: IonTextarea) {
        if(!this.date || !takeReason.value) {
            return this._sharedService.showToast('Bạn cần nhập đủ dữ liệu trước!', 'danger');
        }
        return this._modalCtrl.dismiss({
            date: this.date,
            leave_reason: takeReason.value
        });
    }

    public onDismiss() {
        this._modalCtrl.dismiss();
    }
}
type InputForm = string | number;