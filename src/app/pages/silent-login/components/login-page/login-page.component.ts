import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AddressPopupComponent } from 'src/app/pages/seller/components/address-popup/address-popup.component';
import { SellerProfileService } from 'src/app/pages/seller/services/seller-profile.service';
import { SellerService } from 'src/app/pages/seller/services/seller.service';
import { LocalStogareService } from 'src/app/shared/services/local-stogare.service';
import { WindowService } from 'src/app/shared/services/window.service';
import { FormData } from '../../interface/formData';
import { OtpMasterDC, UserDetailDc, UserLocationDc } from '../../interface/OtpMasterDC';
import { FormDataService } from '../../services/form-data.service';
import { SilentLoginService } from '../../services/silent-login.service';
import { BuyerProfileService } from '../../services/buyer-profile.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  mobile: string;
  cookiesValue: any;
  login: boolean = false;
  otp: boolean = false;
  userexist: boolean = false;
  mobileExist: boolean = false;
  radioSelected: string;
  passwordShow: boolean = false;
  infoShow: boolean = false;
  addressShow: boolean = false;
  data: any;
  otpMasterDC: OtpMasterDC;
  formData: FormData;
  userDetailDc: UserDetailDc;
  userLocationDc: UserLocationDc;
  pinTemp: any;
  myControl: string;
  shipPinList: any;
  options: any;
  pinList: any;
  dataList: any[];
  isInvalid: boolean = false;
  hidePincode: boolean = false;
  shipPincode: boolean = false;
  billPinList; boolean = false;
  ISOTP: boolean;
  ISBUYER: boolean;

  constructor(private route: ActivatedRoute
    , private buyerProfileService: BuyerProfileService
    , private silentLoginService: SilentLoginService
    , private localStogareService: LocalStogareService
    , private window: WindowService
    , private router: Router
    , private cookieService: CookieService
    , private sellerService: SellerService
    , private sellerProfileService: SellerProfileService
    , private formDataService: FormDataService
    // , private _bottomSheet: MatBottomSheet,
    ) { this.data = {}; this.dataList = []; }

  ngOnInit(): void {
    this.buyerProfileService.isBuyerLogin().subscribe(x => {
      this.router.navigateByUrl('/ui/app-home/1');

    });
    this.mobileExist = true;
  }
  pincodeSearch(myControl) {
    this.silentLoginService.getByPinAsync(myControl).subscribe(x => {
      this.pinList = x;
      if (this.pinList == null) {
        this.hidePincode = false;
      }
      else {
        this.hidePincode = true;
      }
    })
  }
  reset() {
    this.hidePincode = false;
  }
  resetShipPin() {
    this.shipPincode = false;
  }
  getRandomString(length) {

    // var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // var result = '';
    // for (var i = 0; i < length; i++) {
    //   result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    // }
    // this.cookieService.set('name', result);
    // this.cookiesValue = this.cookieService.get('name');
    // return result;
  }

  loginpopup() {
    this.login = true;
  }
  nextOtp(userEditForm, mobile) {
    if (userEditForm.form.status == "VALID") {
      if (mobile.length == 10) {
        this.formDataService.setMobile(mobile);
        this.silentLoginService.checkUserExist(mobile).subscribe(x => {
          if (x == true) {
            this.formDataService.setUserExist(x);
            this.mobileExist = false;
            this.userexist = true;
            this.isInvalid = false;
          }
          else {
            this.otpMasterDC = {
              Otp: '',
              Purpose: '',
              Id: 0,
              CreatedDate: null,
              ModifiedDate: null,
              CreatedBy: 0,
              ModifiedBy: 0,
              IsActive: true,
              IsDelete: false,
              IsVerfied: false,
              IsUserExist: false,
              MobileNumber: mobile,
              Role: '',
            }
            this.silentLoginService.postOtp(this.otpMasterDC).subscribe(x => {

              this.mobileExist = false;
              this.otp = true;
              this.isInvalid = false;
            })

          }
        })

      }
    }
    else {
      this.isInvalid = true;
    }
  }
  onSelect(userEditForm, radioSelected) {
    if (userEditForm.form.status == "VALID") {
      if (radioSelected == 'Password') {
        this.passwordShow = true;
        this.userexist = false;
        this.isInvalid = false;
      }
      else if (radioSelected == 'OTP') {
        this.formData = this.formDataService.getFormData();

        this.otpMasterDC = {
          Otp: '',
          Purpose: '',
          Id: 0,
          CreatedDate: null,
          ModifiedDate: null,
          CreatedBy: 0,
          ModifiedBy: 0,
          IsActive: true,
          IsDelete: false,
          IsVerfied: false,
          IsUserExist: false,
          MobileNumber: this.formData.MobileNumber,
          Role: '',
        }
        this.silentLoginService.postOtp(this.otpMasterDC).subscribe(x => {

          this.otp = true;
          this.userexist = false;
          this.isInvalid = false;
        })

      }
    }
    else {
      this.isInvalid = true;
    }

  }

  silentLogin(userEditForm, otp) {
    if (userEditForm.form.status == "VALID") {
      this.formData = this.formDataService.getFormData();
      if (this.formData.userExist == true) {
        this.ISOTP = true;
        this.userAuthentication(otp.otp, this.ISOTP);
      }
      else {
        this.formDataService.setOTP(otp.otp);
        this.formData = this.formDataService.getFormData();

        this.otpMasterDC = {
          Otp: otp.otp,
          Purpose: '',
          Id: 0,
          CreatedDate: null,
          ModifiedDate: null,
          CreatedBy: 0,
          ModifiedBy: 0,
          IsActive: true,
          IsDelete: false,
          IsVerfied: false,
          IsUserExist: false,
          MobileNumber: this.formData.MobileNumber,
          Role: '',
        }
        this.silentLoginService.verfiyOtp(this.otpMasterDC).subscribe(x => {
          this.formDataService.setAspUserId(x.AspUserId);
          if (!x.IsExists && x.Result) {
            this.otp = false;
            this.passwordShow = false;
            this.infoShow = true;
            this.isInvalid = false;
          }
          if (x.IsExists && x.Result) // temp
          {
            this.ISOTP = true;
            this.userAuthentication(otp.otp, this.ISOTP);
          }
        })
      }
    }
    else {
      this.isInvalid = true;
    }
  }
  verifyPassword(userEditForm, password) {
    if (userEditForm.form.status == "VALID") {
      this.formData = this.formDataService.getFormData();
      this.ISOTP = false;
      this.userAuthentication(password, this.ISOTP);
    }
    else {
      this.isInvalid = true;
    }
  }
  nextInfo(userEditForm, data, pinList) {
    if (userEditForm.form.status == "VALID") {
      this.formData = this.formDataService.getFormData();

      this.userDetailDc = {
        Id: 0,
        FirstName: data.FirstName,
        MiddleName: data.MiddleName,
        LastName: data.LastName,
        UserId: '',
        Email: data.Email,
        CreatedDate: null,
        ModifiedDate: null,
        CreatedBy: 0,
        ModifiedBy: 0,
        IsActive: true,
        IsDelete: false,
        PincodeMasterId: pinList.Id,
        AspUserId: this.formData.AspUserId,
      }
      this.silentLoginService.addUserDetail(this.userDetailDc).subscribe(x => {
        this.formDataService.setUserDeatilId(x);
        this.infoShow = false;
        this.passwordShow = false;
        this.addressShow = true;
        this.hidePincode = false;
        this.isInvalid = false;
      });

    }
    else {
      // this.isValid = true;
      this.isInvalid = true;
    }
  }
  submit(userEditForm, data, shipPin, pin) {
    if (userEditForm.form.status == "VALID") {
      this.formData = this.formDataService.getFormData();
      if (data.radioSelected == 'Billing') {
        data.IsPrimaryBillingAddress = true;
        data.LocationTypeB = 'Billing';
        data.IsPrimaryShippingAddress = false;
        data.LocationTypeS = 'Shipping';
      }
      else {
        data.IsPrimaryShippingAddress = true;
        data.LocationTypeS = 'Shipping'
        data.IsPrimaryBillingAddress = false;
        data.LocationTypeB = 'Billing';
      }
      let billing =
      {
        Id: null,
        UserDetailId: this.formData.UserDetailId,
        AddressOne: data.BillingAddressOne,
        AddressTwo: data.BillingAddressTwo,
        AddressThree: data.BillingAddressThree,
        PinCodeMasterId: pin.Id,
        CreatedDate: null,
        ModifiedDate: null,
        CreatedBy: null,
        ModifiedBy: null,
        IsActive: true,
        IsDelete: false,
        IsSkip: false,
        LocationType: data.LocationTypeB,
        IsPrimaryAddress: data.IsPrimaryBillingAddress,
        Latitiute: 0,
        Longitude: 0,
      }
      let shipping =
      {
        Id: null,
        UserDetailId: this.formData.UserDetailId,
        AddressOne: data.ShippingAddressOne,
        AddressTwo: data.ShippingAddressTwo,
        AddressThree: data.ShippingAddressThree,
        PinCodeMasterId: shipPin.Id,
        CreatedDate: null,
        ModifiedDate: null,
        CreatedBy: null,
        ModifiedBy: null,
        IsActive: true,
        IsDelete: false,
        IsSkip: false,
        LocationType: data.LocationTypeS,
        IsPrimaryAddress: data.IsPrimaryShippingAddress,
        Latitiute: 0,
        Longitude: 0,
      }
      this.dataList.push(billing, shipping);
      this.silentLoginService.addUserLocation(this.dataList).subscribe(x => {

        // if(x==true)
        // {
        this.ISOTP = true;
        this.userAuthentication(this.formData.OTPData, this.ISOTP);
        //}
      })
    }
    else {
      this.isInvalid = true;
    }
  }

  userAuthentication(password, ISOTP) {
    this.ISBUYER = true;
    this.silentLoginService.userAuthentication(this.formData.MobileNumber, password, ISOTP, this.ISBUYER, 'BUYERAPP').subscribe(x => {
      this.localStogareService.set(this.localStogareService.tokenKey, x.access_token)
      let redirectUrl =  this.localStogareService.getItemString(this.localStogareService.redirectUrlKey);
      if(redirectUrl){
        this.router.navigateByUrl(redirectUrl);
      }
      // console.log('result is: ', x);
      // this.otp = false;
      // if (!this.cookiesValue) {
      // }
      // this.cookiesValue = this.cookieService.get('name');
      // this.sellerService.UpdateCartByBuyer(this.cookiesValue).subscribe(result => {
      //   if (result == null) {
      //     this.router.navigateByUrl('/ui/seller/' + x.EncodeId);
      //   }
      //   else {
      //     this.openBottomSheet();
      //   }
      // })
    });
  }
  openBottomSheet(): void {
    // this._bottomSheet.open(AddressPopupComponent);
  }


  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  shippingPincodeSearch(myControl) {
    this.silentLoginService.getByPinAsync(myControl).subscribe(x => {
      this.shipPinList = x;
      if (this.shipPinList == null) {
        this.shipPincode = false;
      }
      else {
        this.shipPincode = true;
      }
    })
  }
  billingPincodeSearch(myControl) {
    this.silentLoginService.getByPinAsync(myControl).subscribe(x => {
      this.billPinList = x;
      if (this.billPinList == null) {
        this.hidePincode = false;
      }
      else {
        this.hidePincode = true;
      }
    })
  }

  cancel() {
    this.login = false;
    this.otp = false;
    this.userexist = false;
    this.mobileExist = false;
    this.passwordShow = false;
    this.infoShow = false;
    this.addressShow = false;
  }

  onChange(pinInput) {

    console.log('pinInput: ', pinInput);
  }
  public inputValidator(event: any) {
    const pattern = /^[a-zA-Z ]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, "");
    }
  }

}

