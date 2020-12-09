import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartItemDC, SellerProductFilter, StoreViewDC } from 'src/app/pages/seller/interface/SellerProductFilter';
import { SellerProfileService } from 'src/app/pages/seller/services/seller-profile.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-variants',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.scss']
})
export class VariantsComponent implements OnInit {
  sellerid : any;
  storeViewDC : StoreViewDC
  variantProductList : any;
  rows : number;
  sellerProductFilter : SellerProductFilter;
  Id : number;
  apiurl: string;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  cookiesValue: any;
  EncryptSellerId: any;
  getCartList : any;
  addCartList : any;
  CartItemDC : CartItemDC;

  constructor(private router: Router,
    private route: ActivatedRoute,
    // private localStorage: LocalStogareService,
    private sellerProfileService: SellerProfileService,
    private loaderService: LoaderService,
    private cookieService: CookieService,
) { this.apiurl = environment.apiBaseUrl;
  this.cookiesValue = cookieService.get("name");
}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sellerid = params['sellerid'];
      this.Id = params['Id'];
    });
    this.rows = 5;
    this.loaderService.setState(true);
    this.sellerProfileService.getCartItem(this.cookiesValue).subscribe(x => {
      this.loaderService.setState(false);
      console.log('cart is: ', x);
      if (x) {
        this.getCartList = x.Cart;
        this.EncryptSellerId = x.EncryptSellerId;
        this.Id = x.Id;
      }
    });
    this.getSellerProduct();
  }
  
  getSellerProduct() {

    this.sellerProductFilter = {
      SellerId: this.sellerid,
      CateogryId: 0,
      BrandId: 0,
      Latitude: 0,
      Longitude: 0,
      ProductName : '',
      Skip : 0,
      Take : this.rows,
      ParentProductId : this.Id,
      Keyword : ''
    }
      this.loaderService.setState(true);
      this.sellerProfileService.getSellerProduct(this.sellerProductFilter).subscribe(x => {
        this.loaderService.setState(false);
        console.log('variant product: ', x);
        this.variantProductList = x.SellerProductDC;
        this.addStoreView();
      });
  }

  addStoreView()
  {
    this.storeViewDC = {
      SellerId : this.sellerid
    }
    this.sellerProfileService.addStoreView(this.storeViewDC).subscribe(res=>
      {
      });
  }
  addProduct(item) {
      // this.increment(item);
  }
  // increment(item) {
  //   if (this.getCartList) {
  //     if (this.sellerid == this.EncryptSellerId) {
  //         this.CartItemDC =
  //         {
  //           MOQ: item.MOQ,
  //           Mrp: item.Mrp,
  //           Margin: item.Margin,
  //           ProductMasterId: item.ProductMasterId,
  //           SellerId: this.sellerid,
  //           BuyerId: 0,
  //           Quantity: item.Qty,
  //           Price: item.SellingPrice,
  //           CookieValue: this.cookiesValue,
  //           ImagePath: item.ImagePath,
  //           Id: item.Id
  //         }
  //           this.loaderService.setState(true);
  //           this.sellerProfileService.addCart(this.CartItemDC).subscribe(res => {
  //             this.loaderService.setState(false);
  //             this.addCartList = res;
  //               this.loaderService.setState(true);
  //               this.sellerProfileService.getCartItem(this.cookiesValue).subscribe(x => {
  //                 this.loaderService.setState(false);
  //                 this.getCartList = x.Cart;
  //                 this.Id = x.Id;
  //               })
  //           });
  //       }
  //     }
  //     // else {
  //     //   this.confirmDialogService.confirm({
  //     //     bodyMessage: 'Your Cart has existing items from Another Seller.Do You Want to clear it and add items from this Seller?',
  //     //     headerMessage: 'Confirmation'
  //     //   }).subscribe(() =>{
  //     //     // this.clearAllItems();
  //     //   });

  //     // }
  //   }
    // if (!this.getCartList) {
    //   if (item.Qty == null) {
    //     item.Qty = parseInt(item.Qty);
    //   } else {
    //     item.Qty += 1;
    //     if (item.Quantity) {
    //       item.Quantity = item.Qty;
    //     }
    //     if (this.item.SellingPrice == undefined) {
    //       this.item.SellingPrice = item.price;
    //       item.Rate = item.price;
    //     }
    //     this.Price = item.Rate;
    //     this.totalPrice = this.totalPrice + this.Price;
    //     if (item.Qty == 1) {
    //       this.itemQty = this.itemQty + 1;
    //     }
    //     this.CartItemDC =
    //     {
    //       MOQ: item.MOQ,
    //       Mrp: this.item.Mrp,
    //       Margin: item.Margin,
    //       ProductMasterId: this.item.ProductMasterId,
    //       SellerId: this.sellerid,
    //       BuyerId: 0,
    //       Quantity: item.Qty,
    //       Price: this.item.SellingPrice,
    //       CookieValue: this.cookiesValue,
    //       ImagePath: this.item.ImagePath,
    //       Id: this.item.Id
    //     }
    //       this.loaderService.setState(true);
    //       this.sellerProfileService.addCart(this.CartItemDC).subscribe(res => {
    //         this.loaderService.setState(false);
    //         this.addCartList = res;
    //         this.EncryptSellerId = res.EncryptSellerId;
    //           this.loaderService.setState(true);
    //           this.sellerProfileService.getCartItem(this.cookiesValue).subscribe(x => {
    //             this.loaderService.setState(false);
    //             this.getCartList = x.Cart;
    //             this.Id = x.Id;
    //           });
    //       });
    //   }
    // }

  // };
  
}
