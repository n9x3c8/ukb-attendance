import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {
  constructor(private _storageService: StorageService) {}
  async canActivate() {
    return await this._storageService.get('permission_id') == '2' || await this._storageService.get('logged') == '2' ? true: false;
  }  
}