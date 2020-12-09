import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/pages/seller/services/seller.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LocalCartService } from 'src/app/shared/services/local-cart.service';


@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss']
})
export class BottomNavigationComponent implements OnInit {
  cookiesValue: any;
  cart: any;
  constructor(private router: Router, private cookieService: CookieService, private localCartService: LocalCartService) {
    this.localCartService.localCart.subscribe(x => { 
      this.cart = x; 
      console.log('this.cart is: ', this.cart);
    });
  }

  ngOnInit(): void {
    this.localCartService.updateLocalCart();
  }

  openCart() {

    this.router.navigateByUrl('/ui/cart');
  }

  openTrade() {
    this.router.navigateByUrl('/ui/my-trade/my-order');
  }

  openHome() {
    // this.router.navigateByUrl('/ui/seller');
    this.router.navigateByUrl('/ui/app-home/1');
  }
  openProfile() {
    this.router.navigateByUrl('/ui/buyer-profile');
  }
}
