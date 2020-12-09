import { Injectable } from '@angular/core';
import { FormData } from '../interface/formData';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formData: FormData = new FormData();

  constructor() { }
  setMobile(data) {
    this.formData.MobileNumber = data;
    }
  getMobile() {
    this.formData.MobileNumber = this.formData.MobileNumber;
    }
  setOTP(data) {
    this.formData.OTPData = data;
    }
  getOTP() {
    this.formData.OTPData = this.formData.OTPData;
    }
  setAspUserId(data) {        
   this.formData.AspUserId = data;
   }
 getAspUserId() {
   this.formData.MobileNumber = this.formData.MobileNumber;
   }
 setUserDeatilId(data) {            
    this.formData.UserDetailId = data;
    }
 getUserDeatilId() {
     this.formData.UserDetailId = this.formData.UserDetailId;
  }
  setUserExist(data) {            
    this.formData.userExist = data;
    }
  getUserExist() {
     this.formData.userExist = this.formData.userExist;
  }
 getFormData(): FormData {
    return this.formData;
   }
}
