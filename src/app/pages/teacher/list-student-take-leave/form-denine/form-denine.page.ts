import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
    selector: 'attendance-form-denine',
    templateUrl: 'form-denine.page.html',
    styleUrls: ['form-denine.page.scss']
})
export class FormDeninePage {
    public data: string;
    constructor(private _modalCtrl: ModalController) {}
        
    public onDenine() {
        this._modalCtrl.dismiss(this.data);
    }

    public onDismiss() {
        this._modalCtrl.dismiss('cancel');
    }
}