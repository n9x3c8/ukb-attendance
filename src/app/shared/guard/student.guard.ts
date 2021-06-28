import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {
  constructor(private _storageService: StorageService) {}
  async canActivate() {
    return await this._storageService.get('permission_id') == '1' || await this._storageService.get('logged') == '1' ? true: false;
  }
  
}
