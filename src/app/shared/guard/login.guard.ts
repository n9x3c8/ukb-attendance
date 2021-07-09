import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private _storageService: StorageService, private router: Router) {}
  async canActivate() {
    let logged = await this._storageService.get('logged');
    if(+logged === 1) {
      this.router.navigate(['student', 'dashboard']);
      return false;
    }

    if(+logged === 2) {
      this.router.navigate(['teacher', 'dashboard']);
      return true;
    }
    return true;
  }
}
