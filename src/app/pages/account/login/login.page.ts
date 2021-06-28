import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { timer } from 'rxjs';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'attendance-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements ViewDidEnter {
  public isShowPassword: boolean;
  constructor(
    private _accountService: AccountService,
    private _storageService: StorageService,
    private _sharedService: SharedService,
    private router: Router,
  ) { }

  ionViewDidEnter() {
    this.checkLogged();
  }
  
  private async checkLogged() {
    let isLogged = await this._storageService.get('logged');
    if(isLogged == '2') {
      return this.router.navigate(['teacher', 'dashboard']);
    }
    if(isLogged == '1') {
      return this.router.navigate(['student', 'dashboard']);
    }
    return;
  }


  public onChangeHideState() {
    this.isShowPassword = !this.isShowPassword;
  }

  public async onLogin(username: string | number, password: string | number) {
    if(username.toString().length < 3) {
      return this._sharedService.showToast('Tên tài khoản phải lớn hơn 10 ký tự!', 'danger', '');
    }
    if(password.toString().length < 3) {
      return this._sharedService.showToast('Mật khẩu phải lớn hơn 8 ký tự!', 'danger', '');
    }
    
    username = username.toString().toUpperCase();
    password = password.toString().toUpperCase();
    if(!username || !password) {
      return this._sharedService.showToast('Bạn cần nhập đủ thông tin!', 'danger', '');
    }
    await this._sharedService.showLoading('Đang đăg nnhập...');
    (await this._accountService.login(username, password)).subscribe( async (res: any) => {
      if (res.permission === -1) {
        this._sharedService.loading.dismiss();
        return this._sharedService.showToast('Đăng nhập thất bại. Kiểm tra lại tài khoản và mật khẩu', 'danger', '');
      }

      if (res.permission == 1) {
        await this._storageService.clear();
        await this._storageService.set('username', res.username);
        await this._storageService.set('permission_id', res.permission);
        await this._sharedService.loading.dismiss();
        await this.router.navigate(['student', 'dashboard']);
        await this._sharedService.showToast('Đăng nhập thành công!', 'success');
      }

      // phan quyen cho giang vien id per la 2
      if (res.permission == 2) {
        await this._storageService.clear();
        await this._storageService.set('username', res.username);
        await this._storageService.set('permission_id', res.permission);
        await this._sharedService.loading.dismiss();
        await this.router.navigate(['teacher', 'dashboard']);
        await this._sharedService.showToast('Đăng nhập thành công!', 'success');
      }
    });
    return timer(1800).subscribe(() => {
      this._sharedService.loading.dismiss();
    });
  }
}
