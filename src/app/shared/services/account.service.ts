import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  public async login(username: string | number, password: string | number) {
    const data = { username, password };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }
    
    return await this.http.post(`${this.domain}/mvc/public/account/login`, data,  options);
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
