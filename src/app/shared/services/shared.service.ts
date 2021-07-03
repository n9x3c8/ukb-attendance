import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { DomainAPI } from 'src/app/shared/class/domain.class';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService extends DomainAPI {
  private username;
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }
  public loading: HTMLIonLoadingElement;
  constructor(
    private http: HttpClient,
    private _storageService: StorageService,
    private readonly _toast: ToastController,
    private readonly _loading: LoadingController,
    private _alertController: AlertController
  ) {
    super();
    this.init();
  }

  async init() {
    this.username = await this._storageService.get('username');
  }


  async getSubjects(classId: string) {
    this.username = await this._storageService.get('username');
    let uuid = await this.getIdDevice();
    let url: string = `${this.domain}/mvc/public/subject/get_all_subject_by_teacher/${this.username}/${uuid}/${classId}`;
    return await this.http.get(url);
  }


  //Class
  async isExistTeachDetail(classId: string, subjectId: string) {
    this.username = await this._storageService.get('username');
    let url: string = `${this.domain}/mvc/public/classRoom/check_teach_detail/${this.username}/${classId}/${subjectId}`;
    return await this.http.get(url);
  }

  async getClass() {
    let username = await this._storageService.get('username');
    let uuid: any = await this.getIdDevice();
    let url: string = `${this.domain}/mvc/public/classRoom/get_all_class_by_teacher/${username}/${uuid}`;
    return await this.http.get(url);
  }

  public getDatetime() {
    const date: Date = new Date();
    let year: number = date.getFullYear();
    let month: string = this.formatDate(date.getMonth() + 1);
    let day: string = this.formatDate(date.getDate());
    return `${year}${month}${day}`;
  }

  public getCurrentTime(): string {
    let date = new Date();
    let yearMonthDate = this.getDatetime();
    let hours = this.formatDate(date.getHours());
    let min = this.formatDate(date.getMinutes());
    let seconds = this.formatDate(date.getSeconds());
    return `${yearMonthDate}${hours}${min}${seconds}`;
  }

  public convertDateToString(datetime: string): string {
    let date: string[] = datetime.split('-');
    return date.join('');
  }

  public formatDate(num: number): string {
    if (!isNaN(num)) {
      return num < 10 ? '0' + num : '' + num;
    }
  }

  async showLoading(message: string) {
    this.loading = await this._loading.create({
      message,
      mode: 'ios'
    });
    await this.loading.present();
  }

  public async showToast(message: string, color: string = 'dark', cssClass: string = 'toast-custom-56', position?: toast) {
    const toast = await this._toast.create({
      message,
      cssClass,
      mode: 'ios',
      duration: 1200,
      color,
      position
    });
    return toast.present();
  }



  async showAlert(message: string, header: string = 'Cảnh báo', agreeHandle?: Function, msgCancel?: string) {
    const alert = await this._alertController.create({
      header,
      message,
      buttons: [
        {
          text: `Đồng ý`,
          handler: () => agreeHandle()
        },
        {
          text: 'Hủy',
          role: 'cancel',
          handler: async (blah) => {
            if (msgCancel) {
              // 3 ko luu mat khau
              await this._storageService.set('logged', 3);
              await this.showToast(msgCancel, 'danger');
            }
          }
        }
      ]
    });
    return await alert.present();
  }
}
type toast = "top" | "bottom" | "middle";