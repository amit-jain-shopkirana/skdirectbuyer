import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SilentLoginService } from '../../services/silent-login.service';
import { LocalStogareService } from 'src/app/shared/services/local-stogare.service';
import { WindowService } from 'src/app/shared/services/window.service';
import { CookieService } from 'ngx-cookie-service';
import { SellerService } from 'src/app/pages/seller/services/seller.service';

@Component({
  selector: 'app-silent-login',
  templateUrl: './silent-login.component.html',
  styleUrls: ['./silent-login.component.scss']
})
export class SilentLoginComponent implements OnInit {
  mobile: string;
  cookiesValue : any;
  constructor(private route: ActivatedRoute
    , private silentLoginService: SilentLoginService
    , private localStogareService: LocalStogareService
    , private window: WindowService
    , private router: Router
    ,private cookieService : CookieService,
    private sellerService : SellerService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.mobile = params.get('mobile');
      if (this.mobile) {
      //   this.silentLoginService.userAuthentication(this.mobile, '').subscribe(x => {
          
      //     this.localStogareService.set('userToken', x.access_token)          
      //     // console.log('result is: ', x);
      //     this.getRandomString(8);
      //     this.router.navigateByUrl('ui/app-home/1');
      //   });
      }
    });
  }
  getRandomString(length) {
    // var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // var result = '';
    // for ( var i = 0; i < length; i++ ) {
    //     result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    // }
    // this.cookieService.set( 'name', result );
    // this.cookiesValue = this.cookieService.get( 'name');
    // this.updateCart();
    // return result;
  }

  updateCart()
  {
    // this.sellerService.UpdateCartByBuyer(this.cookiesValue).subscribe(result=>
    //   {
    //   })
  }


}
