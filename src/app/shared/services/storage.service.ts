import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private _storage: Storage) {}

    public async set(key: string, value: any) {
        return await this._storage.set(key, value);
    }

    public async get(key: string) {
        return await this._storage.get(key);
    }

    public async remove(key: string) {
        return await this._storage.remove(key);
    }

    public async clear() {
        return this._storage.clear();
    }
}

