import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SilentLoginRoutingModule } from './silent-login-routing.module';
import { SilentLoginComponent } from './components/silent-login/silent-login.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { AddressPopupComponent } from '../seller/components/address-popup/address-popup.component';

import { SkDirectSharedModule } from 'src/app/shared/sk-direct-shared.module';
import { MobileInputComponent } from './components/mobile-input/mobile-input.component';
import { LoginComponent } from './components/login/login.component';
import { LoginMethodInputComponent } from './components/login-method-input/login-method-input.component';
import { VerificationInputComponent } from './components/verification-input/verification-input.component';


@NgModule({
  declarations: [SilentLoginComponent, LoginPageComponent, MobileInputComponent, LoginComponent, LoginMethodInputComponent, VerificationInputComponent],
  imports: [
    CommonModule,
    SilentLoginRoutingModule,
    FormsModule,
    SkDirectSharedModule
    // MatAutocompleteModule,
    // MatInputModule
  ],
   entryComponents: [
    AddressPopupComponent
  ],
})
export class SilentLoginModule { }
