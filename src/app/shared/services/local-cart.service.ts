import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { CartOverviewService } from 'src/app/pages/seller/services/cart-overview.service';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';
import { LocalStogareService } from './local-stogare.service';

@Injectable({
  providedIn: 'root'
})
export class LocalCartService {
  public localCart: Subject<any> = new Subject<any>();
  constructor(private cartOverviewService: CartOverviewService
    , private cookieService: CookieService, private localStorage: LocalStogareService
    , private loaderService: LoaderService) {
  }

  public updateLocalCart() {
 
    let cookiesName = this.cookieService.get('name');
    if (!cookiesName) {
      cookiesName = this.createGuid();
      this.cookieService.set("name", cookiesName);
    }
    
    let token = this.localStorage.getItemString('userToken');
    this.loaderService.setState(true);
    if (token) {
      this.cartOverviewService.getCartUsingToken(cookiesName).subscribe(x => {
        this.loaderService.setState(false);
        this.localCart.next(x);
      });
    } else {
     
      this.cartOverviewService.getCartUsingCookie(cookiesName).subscribe(x => {
        this.loaderService.setState(false);
        this.localCart.next(x);
      });
    }
  }

  private createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
