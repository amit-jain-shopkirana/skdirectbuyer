import { Component, OnInit, ViewChild } from '@angular/core';
import { CartOverviewService } from 'src/app/pages/seller/services/cart-overview.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStogareService } from 'src/app/shared/services/local-stogare.service';
import { SellerService } from 'src/app/pages/seller/services/seller.service';
import { SellerProfileService } from 'src/app/pages/seller/services/seller-profile.service';
import { CartItemDC, DeleteCartItemDC } from 'src/app/pages/seller/interface/SellerProductFilter';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { ConfirmationService, Message } from 'primeng/api';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';
import { SkDialogComponent } from 'src/app/shared/components/sk-dialog/sk-dialog.component';
import { SkAlertLayout } from 'src/app/shared/interface/sk-alert-layout';
import { SkAlertService } from 'src/app/shared/services/sk-alert.service';
import { LocalCartService } from 'src/app/shared/services/local-cart.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SellerProductDetailService } from 'src/app/pages/product/services/seller-product-detail.service';
import { CartHelper } from 'src/app/shared/helper/cart-helper';
import { BuyerProfileService } from 'src/app/pages/buyer-profile/services/buyer-profile.service';

@Component({
  selector: 'app-cart-overview',
  templateUrl: './cart-overview.component.html',
  styleUrls: ['./cart-overview.component.scss']
})
export class CartOverviewComponent implements OnInit {
  afterInit: boolean;
  cart: any;
  baseUrl: string
  token: string;
  cookiesName: any;
  sellerId: any;
  deleteCartItemDC: DeleteCartItemDC;
  msgs: Message[] = [];
  IsRegistrationComplete : any;
  // selectedProduct: any; 
  quantity : any;
  cookiesValue: string;
  cartItemDC : CartItemDC;
  productVariantId : any[];
  buyerProfile : any;
  cartRefresh : number;
  del : boolean = false;

  constructor(private localCartService: LocalCartService, private route: ActivatedRoute
    , private cookieService: CookieService, private localStorage: LocalStogareService
    , private router: Router, private sellerService: SellerService
    , private sellerProfileService: SellerProfileService
    , private confirmationService: ConfirmDialogService
    , private skAlertService: SkAlertService
    , private loaderService : LoaderService
    ,  private sellerProductDetailService: SellerProductDetailService
    , private cartOverviewService : CartOverviewService
    , private layoutService: LayoutService
    , private buyerProfileService: BuyerProfileService) {
    this.baseUrl = environment.apiBaseUrl;
    this.productVariantId = [];
    this.localCartService.localCart.subscribe(x => {
      this.cart = x;
      // this.updateValue();
      this.afterInit = true;
      console.log('this.cart: ', this.cart);
    });
  }

  ngOnInit(): void {
    this.layoutService.setModel({
      showBottomNavigation: false,
      showTopNavigation: false
    });
    this.route.params.subscribe(params => {
      this.cartRefresh = params["cart"];
    });
    if(this.cartRefresh == 1 && this.del == false && this.cart != null)
    {
      this.skAlertService.open({
        bodyMessage: 'Their is some temporary out of stock please clear those stock first',
        headerMessage: '',
        isShowAlert: true
      }).subscribe(() => {
        // this.ngOnInit();
      })
    }
    this.localCartService.updateLocalCart();
  }


  openCheckout() {
    this.buyerProfileService.getUserDetail().subscribe(x => {
      this.buyerProfile = x;
      console.log('this.buyerProfile: ', this.buyerProfile);
      if(this.buyerProfile == null)
      {
        this.router.navigateByUrl('login');
      }
    this.IsRegistrationComplete = this.localStorage.getItemString('IsRegistrationComplete');
    if(this.buyerProfile.IsRegistrationComplete == false)  // this.IsRegistrationComplete == 'False' 
    {
      this.skAlertService.open({
        bodyMessage: 'Please Update Your Profile!',
        headerMessage: '',
        isShowAlert: true
      }).subscribe(() => {
        this.router.navigateByUrl('ui/buyer-profile');
      })     
    }
    else{
      this.router.navigateByUrl('ui/cart/checkout');
    }  
  });  
  }

  deleteCartItems(list) {
    this.confirmationService.confirm({
      bodyMessage: 'Are you sure that you want to delete this item?',
      headerMessage: ''
    }).subscribe(() => {
      this.deleteCartItemDC = {
        CookieValue: this.cookiesName,
        Id: list.Id
      }
        this.loaderService.setState(true);
        this.sellerProfileService.deleteCartItem(this.deleteCartItemDC).subscribe(x => {
          this.loaderService.setState(false);
          this.skAlertService.open({
            bodyMessage: 'Item deleted successfully',
            headerMessage: 'Deleted',
            isShowAlert: true
          }).subscribe(() => {
            this.del = true;
            this.ngOnInit();
          })

        })
    });
  }

  clearAllItems() {
    this.confirmationService.confirm({
      bodyMessage: 'Are you sure that you want to clear the cart?',
      headerMessage: ''
    }).subscribe(() => {
      if (true == true) {
        this.loaderService.setState(true);
        this.sellerProfileService.clearCart(this.cart.Id).subscribe(x => {
          this.loaderService.setState(false);
          if (x == true) {
            this.skAlertService.open({
              bodyMessage: 'Cart is Cleared successfully',
              headerMessage: '',
              isShowAlert: true
            }).subscribe(() => {
              this.cart = [];
            })
           
          }
        });
      }
    })
  }

  navigateToSeller() {
    this.router.navigateByUrl('/ui/app-home/1');
  }
  updateProductQuantity(quantity: number,cart) {
    this.cookiesValue = this.cookieService.get("name");
    console.log('quantity is: ', quantity);
    this.quantity = quantity;
    this.loaderService.setState(true);
    cart.Quantity = (cart.Quantity ? cart.Quantity : 0) + quantity;
    this.cartItemDC= {
      Id : cart.Id,
      Quantity : cart.Quantity,
      CookieValue : this.cookiesValue,
      ProductVariantAttributeId : 0,
      ProductVariantId : this.productVariantId,
    }
    this.cartOverviewService.addCart(this.cartItemDC).subscribe(x=>
      {
        this.getCart();
        this.loaderService.setState(false);
        
      })

    // let viewModel = CartHelper.GetModelToUpdateItemQuantity(this.cart.Cart.Id, this.cart.Cart.Quantity, this.cookiesValue);
    // this.sellerProductDetailService.addCartItem(viewModel).subscribe(x => {      
    // })
  }
  getCart()
  {
    if (this.token) {
      this.sellerProductDetailService.getCartItemUsingToken(this.cookiesValue).subscribe(x => {
        this.cart = x;
        for(var i in this.cart.Cart)
        {
          if(this.cart.Cart[i].Quantity == 0)
          {
            this.deleteCartItemDC = {
              CookieValue: this.cookiesName,
              Id: this.cart.Cart[i].Id
            }
            this.loaderService.setState(true);
            this.sellerProfileService.deleteCartItem(this.deleteCartItemDC).subscribe(x => {
              this.loaderService.setState(false);
              this.del = true;
              this.ngOnInit();
              })    
          }
        }
        // this.updateValue();
        // this.getCartItem();
        this.loaderService.setState(false);
      });
    } else if (this.cookiesValue) {
      this.sellerProductDetailService.getCartItemUsingCookie(this.cookiesValue).subscribe(x => {
        this.cart = x;
          for(var i in this.cart.Cart)
          {
            if(this.cart.Cart[i].Quantity == 0)
            {
              this.deleteCartItemDC = {
                CookieValue: this.cookiesName,
                Id: this.cart.Cart[i].Id
              }
              this.loaderService.setState(true);
              this.sellerProfileService.deleteCartItem(this.deleteCartItemDC).subscribe(x => {
                this.loaderService.setState(false);
                this.del = true;
                  this.ngOnInit();
                })
      
            }
          }
        // this.updateValue();
        // this.getCartItem();
        this.loaderService.setState(false);
      });
    }
  }
  back()
  {
    this.cart;
    this.router.navigateByUrl('ui/app-home/1');
  }
  // private updateValue() {
  //   console.log('this.cart: ', this.cart);
  //   this.cart.Cart.Quantity = 0;
  //   if (this.cart && this.cart.Cart && this.cart.Cart.length > 0) {
  //     this.cart.Cart.forEach(element => {
  //       if (this.cart.Cart.Id == element.Id) {
  //         this.cart.Cart.Quantity = element.Quantity;
  //       }
  //     });
  //   }
  // }
}
