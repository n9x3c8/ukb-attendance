import { Device } from '@capacitor/device';
export class DomainAPI {
  protected domain: string;
  constructor() {
      this.domain = 'http://attendance-api.cf';
      // this.domain = 'http://woala932.000webhostapp.com';
      // this.domain = 'http://tranquocbn.mypressonline.com';
      // this.domain = 'http://localhost';
  }

  protected async getIdDevice() {
    return await (await Device.getId()).uuid;
  }

}
