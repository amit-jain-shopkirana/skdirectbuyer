import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SellerProductDetailService } from 'src/app/pages/product/services/seller-product-detail.service';
import { SellerService } from 'src/app/pages/seller/services/seller.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { LocalStogareService } from 'src/app/shared/services/local-stogare.service';
import { environment } from 'src/environments/environment';
import { BuyerProfileService } from '../../services/buyer-profile.service';
import { SilentLoginService } from '../../services/silent-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginLayout: LoginLayoutViewModel;
  mobileNumber: string;
  isPasswordMethodSelect: boolean;
  userExistsViewModel: any;
  isUserExists: boolean;
  redirectUrl: string = '/ui/buyer-profile'  //'/ui/app-home/1';
  defaultRedirecUrl: string;
  WrongOTP: boolean = false;
  cookiesValue: string;
  showLoginSucessfullDialog: boolean;
  IsRegistrationComplete: string;
  constructor(private buyerProfileService: BuyerProfileService
    , private router: Router
    , private silentLoginService: SilentLoginService
    , private localStogareService: LocalStogareService
    , private loaderService: LoaderService
    , private sellerService: SellerService
    , private cookieService: CookieService
    , private sellerProductDetailService: SellerProductDetailService) {
    this.loginLayout = {
      isShowLoginInput: true,
      isShowLoginMethod: false,
      isShowVerificationInput: false
    }

    this.loaderService.setState(true);

    this.defaultRedirecUrl = localStogareService.getItemString(localStogareService.redirectUrlKey);
    if (!this.defaultRedirecUrl) {
      this.defaultRedirecUrl = environment.defaultUrl;
    }
    this.buyerProfileService.isBuyerLogin().subscribe(x => {
      console.log('yes logged in');
      this.loaderService.setState(false);

      this.router.navigateByUrl(this.defaultRedirecUrl);
    }, err => {
      this.loaderService.setState(false);
    });
  }

  ngOnInit(): void {
  }

  onMoileSelection(mobile: string) {
    this.mobileNumber = mobile;
    this.loaderService.setState(true);
    this.silentLoginService.checkUserExist(this.mobileNumber).subscribe(x => {
      this.loaderService.setState(false);
      this.isUserExists = x;
      this.resetLoginLayoutViewModel();
      if (this.isUserExists) {
        // this.loginLayout.isShowLoginMethod = true;
        this.onLoginMethodSelect(false);

      } else {
        this.onLoginMethodSelect(false);
      }

    })

  }

  onLoginMethodSelect(isPasswordMethodSelect) {
    this.isPasswordMethodSelect = isPasswordMethodSelect;
    if (!this.isPasswordMethodSelect) {
      this.loaderService.setState(true);
      this.silentLoginService.generateOtp(this.mobileNumber).subscribe(x => {
        this.loaderService.setState(false);
        this.userExistsViewModel = x;
        this.resetLoginLayoutViewModel();
        this.loginLayout.isShowVerificationInput = true;
      });
    } else {
      this.resetLoginLayoutViewModel();
      this.loginLayout.isShowVerificationInput = true;
    }

  }

  onSubmitOtp(otp: string) {
    if (this.isUserExists) {
      this.loaderService.setState(true);
      this.silentLoginService.verfiyOtp({ MobileNumber: this.mobileNumber, Otp: otp }).subscribe(x => {
        console.log('x is : ', x);
        if (x.Userid == null && x.IsUserExist == null) {
          alert('InValid OTP');
          this.loginLayout.isShowVerificationInput = true;
          this.WrongOTP = true;
          this.loaderService.setState(false);
          return false;
        }
        else {
          this.authenticate(otp);
          this.loaderService.setState(false);
        }
      });
    } else {
      this.loaderService.setState(true);
      this.silentLoginService.verfiyOtp({ MobileNumber: this.mobileNumber, Otp: otp }).subscribe(x => {
        this.loaderService.setState(false);
        if (x.Userid == null && x.IsUserExist == null) {
          alert('InValid OTP');
          this.loginLayout.isShowVerificationInput = true;
          this.WrongOTP = true;
          this.loaderService.setState(false);
          return false;
        }
        else {
          this.authenticate(otp);
          this.loaderService.setState(false);
        }
      });
    }

  }

  onSubmitPassword(password: string) {
    this.loaderService.setState(true);
    this.silentLoginService.userAuthentication(this.mobileNumber, password, false, true, 'BUYERAPP').subscribe(x => {
      this.localStogareService.set(this.localStogareService.tokenKey, x.access_token)
      this.localStogareService.set('ASPnetUserId', x.AspNetuserId)
      this.localStogareService.set('Phone', x.userName)
      this.localStogareService.set('IsRegistrationComplete', x.IsRegistrationComplete)
      if (x != null) {
        this.cookiesValue = this.cookieService.get("name");
        this.sellerProductDetailService.getCartItemUsingToken(this.cookiesValue).subscribe(x => {
          // this.cart = x;
        });
        // this.sellerService.UpdateCartByBuyer(this.cookiesValue).subscribe(result => {
        // });
      }

      this.IsRegistrationComplete = x.IsRegistrationComplete;
      this.onAfterSuccessfulLogin();
      //let redirectUrl = this.localStogareService.getItemString(this.localStogareService.redirectUrlKey);
      // if (x.IsRegistrationComplete != 'False') {
      //   this.router.navigateByUrl(this.defaultRedirecUrl);
      //   this.loaderService.setState(false);
      // } else {
      //   this.router.navigateByUrl(this.redirectUrl);
      //   this.loaderService.setState(false);
      // }
    });
  }

  onPasswordInputSelect(mobile: string) {
    this.mobileNumber = mobile;
    this.onLoginMethodSelect(true);
  }

  private resetLoginLayoutViewModel() {
    this.loginLayout = {
      isShowLoginInput: false,
      isShowLoginMethod: false,
      isShowVerificationInput: false
    }
  }

  private authenticate(otp: string) {
    this.loaderService.setState(true);
    this.silentLoginService.userAuthentication(this.mobileNumber, otp, true, true, 'BUYERAPP').subscribe(x => {
      this.localStogareService.set(this.localStogareService.tokenKey, x.access_token);
      this.localStogareService.set('ASPnetUserId', x.AspNetuserId)
      this.localStogareService.set('Phone', x.userName)
      this.localStogareService.set('IsRegistrationComplete', x.IsRegistrationComplete)
      if (x != null) {
        this.cookiesValue = this.cookieService.get("name");
        // this.sellerService.UpdateCartByBuyer(this.cookiesValue).subscribe(result => {
        // });
        this.sellerProductDetailService.getCartItemUsingToken(this.cookiesValue).subscribe(x => {
          // this.cart = x;
        });
      }
      this.IsRegistrationComplete = x.IsRegistrationComplete;
      this.onAfterSuccessfulLogin();
      // if (x.IsRegistrationComplete != 'False') {
      //   this.router.navigateByUrl(this.defaultRedirecUrl);
      //   this.loaderService.setState(false);
      // } else {
      //   this.router.navigateByUrl(this.redirectUrl);
      //   this.loaderService.setState(false);
      // }
    });
  }

  onAfterSuccessfulLogin() {
    this.showLoginSucessfullDialog = true;
    setTimeout(() => {
      let redirectUrl = this.localStogareService.getItemString(this.localStogareService.redirectUrlKey);
      this.showLoginSucessfullDialog = false;
      if (this.IsRegistrationComplete != 'False') {
        this.router.navigateByUrl(this.defaultRedirecUrl);
        this.loaderService.setState(false);
      } else {
        this.router.navigateByUrl(this.redirectUrl);
        this.loaderService.setState(false);
      }
    }, 1000);
  }

}


interface LoginLayoutViewModel {
  isShowLoginInput: boolean;
  isShowLoginMethod: boolean;
  isShowVerificationInput: boolean;
}