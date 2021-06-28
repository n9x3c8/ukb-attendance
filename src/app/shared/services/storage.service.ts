import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() {}

    public async set(key: string, value: any) {
        return await Storage.set({key, value});
    }

    public async get(key: string) {
        const { value } = await Storage.get({ key });
        return value;
    }

    public async remove(key: string) {
        return await Storage.remove({ key });
    }

    public async clear() {
        return await Storage.clear();
    }
}

