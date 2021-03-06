import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { DomainAPI } from 'src/app/shared/class/domain.class';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends DomainAPI {

  constructor(
    private _router: Router,
    private http: HttpClient,
    private _storageService: StorageService
  ) {
    super();
  }

  public async login(username: string | number, password: string | number, serial: any) {
    const { uuid } = serial;
    const data = { username, password, uuid };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }
    
    return await this.http.post(`${this.domain}/mvc/public/account/login`, data,  options);
  }


  public updateProfile(data: FormData) {
    let url: string = `${this.domain}/mvc/public/account/update_profile`;
    return this.http.post(url, data).pipe(take(1));
  }


  public reset() {
    let url: string = `${this.domain}/mvc/public/account/reset`;
    return this.http.get(url);
  }

  public async logout() {
    await this._storageService.clear();
    await this._router.navigate(['login']);
  }
}
