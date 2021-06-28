import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomainAPI } from 'src/app/shared/class/domain.class';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService extends DomainAPI {
  private username: string;
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }

  constructor(private http: HttpClient, private _storageService: StorageService) {
    super();
    this.init();
  }

  public async getSubjectsByStudent() {
    this.username = await this._storageService.get('username');
    let url: string = `${this.domain}/mvc/public/subject/list_subject_by_student/${this.username}`;
    return this.http.get(url);
  }

  async init() {
    this.username = await this._storageService.get('username');
  }
}
