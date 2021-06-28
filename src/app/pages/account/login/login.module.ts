import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

//services
import { AccountService } from 'src/app/shared/services/account.service';

import { LoginPage } from './login.page';
import { SharedService } from 'src/app/shared/services/shared.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage],
  providers: [AccountService, SharedService]
})
export class LoginPageModule {}
