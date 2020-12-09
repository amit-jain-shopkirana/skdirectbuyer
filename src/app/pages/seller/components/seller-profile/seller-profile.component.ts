import { Component, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItemDC, DeleteCartItemDC, PlaceOrderDC, SellerProductFilter, StoreViewDC } from '../../interface/SellerProductFilter';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { AddressPopupComponent } from '../address-popup/address-popup.component';
import { SellerProfileService } from '../../services/seller-profile.service';
import { LocalStogareService } from 'src/app/shared/services/local-stogare.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';
import { MetadataService } from 'src/app/social-media-friendly-changes/metadata-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ShortenUriService } from 'src/app/shared/services/shorten-uri.service';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss'],
  host: { 'class': 'app-seller-profile-1' }
})
export class SellerProfileComponent implements OnInit {
  whatsAppPreUrl: string;
  cookiesValue: any;
  sellerid: string;
  sellerProductFilter: SellerProductFilter;
  sellerProductList: any[];
  sellerProductListt: any[];
  userDetail: any;
  lat1: any;
  lng1: any;
  lat2: any;
  lng2: any;
  distance: any;
  item: any;
  itemQty: number;
  totalPrice: number;
  Price: number;
  Total: number;
  CartItemDC: CartItemDC;
  cartCookies: any;
  addCartList: any;
  getCartList: any[];
  countQty: number[];
  apiurl: string;
  abc: boolean = false;
  display = 'none';
  deleteCartItemDC: DeleteCartItemDC;
  Id: string;
  addressList: any;
  PrimaryAddress: any;
  PlaceOrderDC: PlaceOrderDC;
  placed: any;
  @ViewChild(AddressPopupComponent) radioSel;
  token: any;
  EncryptSellerId: any;
  port: string = environment.port ? (':' + environment.port) : '';
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  storeViewDC: StoreViewDC;
  Keyword: any;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  rows: number;
  productVariantId: any[];
  topSeller: any;
  baseUrl: string


  constructor(private router: Router,
    private route: ActivatedRoute,
    private localStorage: LocalStogareService,
    private sellerProfileService: SellerProfileService,
    private cookieService: CookieService,
    private confirmDialogService: ConfirmDialogService,
    private loaderService: LoaderService,
    private sanitizer: DomSanitizer,
    @Optional() private metadataService: MetadataService,
    private shortenUriService: ShortenUriService
  ) {
    this.baseUrl = environment.apiBaseUrl;
    this.countQty = [];
    this.productVariantId = [];
    this.cookiesValue = cookieService.get("name");
    if (!this.cookiesValue) {
      this.cookiesValue = this.createGuid();
      cookieService.set("name", this.cookiesValue);
    }
    this.apiurl = environment.apiBaseUrl;
  }

  ngOnInit(): void {
    if (this.metadataService) {

      this.metadataService.updateMetadata({
        title: 'Page 1',
        description: 'There is some content on page 1',
        imageRelativeUrl: (this.port + '/assets/images/india.png')
      });
    }
    else {
      console.log('no SSRRR');
    }


    console.log('this.route.url:', this.route)
    this.route.params.subscribe(params => {
      this.sellerid = params['sellerid'];
      this.placed = params['placed'];
      this.whatsAppPreUrl = 'whatsapp://send?text=' + environment.sellerAppShareUrl + "/ui/seller/" + this.sellerid;

      // this.shortenUriService.getShortUrl(environment.sellerAppUrl + "/ui/seller/" + this.sellerid)
      //   .subscribe(x => {
      //     console.log('x is: ', x);
      //     this.whatsAppPreUrl = 'whatsapp://send?text=' + environment.sellerAppUrl + "/ui/seller/" + this.sellerid;
      //   });
    });
    this.token = this.localStorage.getItemString(this.localStorage.tokenKey);
    this.localStorage.set('SellerId', this.sellerid);
    if (this.placed == 1) {
      this.clearAllItems();
    }
    this.loaderService.setState(true);
    this.sellerProfileService.getCartItem(this.cookiesValue).subscribe(x => {
      this.loaderService.setState(false);
      this.getSellerProduct();
      console.log('cart is: ', x);
      if (x) {
        this.getCartList = x.Cart;
        this.EncryptSellerId = x.EncryptSellerId;
        this.Id = x.Id;
      }
    });

    this.itemQty = 0;
    this.totalPrice = 0;
    this.Price = 0;
    this.Total = 0;
    // this.getSellerProduct();
    this.sellerProfileService.getUserLocation().subscribe(res => {
      this.addressList = res;
      this.PrimaryAddress = this.addressList.find(Item => Item.IsPrimaryAddress == true);
    });
    this.rows = 5;
    this.Keyword = [];
  }

  getlink(): SafeUrl {

    return this.sanitizer.bypassSecurityTrustUrl(this.whatsAppPreUrl);
  }

  getSellerProduct() {

    this.sellerProductFilter = {
      SellerId: this.sellerid,
      CateogryId: 0,
      BrandId: 0,
      Latitude: this.lat1,
      Longitude: this.lng1,
      ProductName: '',
      Skip: 0,
      Take: this.rows,
      ParentProductId: 0,
      Keyword : ''
    }
    this.loaderService.setState(true);
    this.sellerProfileService.getSellerProduct(this.sellerProductFilter).subscribe(x => {
      this.loaderService.setState(false);
      console.log('seller product: ', x);
      this.sellerProductList = x.SellerProductDC;
      this.addStoreView();
      this.updateSellerProductList();
      this.userDetail = x.UserDetailDC;
      this.lat2 = this.userDetail.Latitiute;
      this.lng2 = this.userDetail.Longitude;
    });
  }
  getCurrentLatLng() {
    this.getSellerProduct();
  }
  _getDistanceFromLatLonInKm() {
    var R = 6371; // Radius of the earth in kilometers
    var dLat = this.deg2rad(this.lat2 - this.lat1); // deg2rad below
    var dLon = this.deg2rad(this.lng2 - this.lng1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(this.lat1)) * Math.cos(this.deg2rad(this.lat1)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    this.distance = R * c; // Distance in KM

    console.log('distance is : ', this.distance)
    return this.distance;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }
  viewAllSellers() {
    this.router.navigateByUrl('ui/seller');
  }

  productDetail(item) {
    console.log('item: ', item);
    if(item.ParentProductId){
      this.router.navigateByUrl('ui/item/detail/' + item.ParentProductId);
    }else{
      this.router.navigateByUrl('ui/item/detail/' + item.Id);
    }
    
  }

  addProduct(item) {
    if(item.ParentProductId){
      this.router.navigateByUrl('ui/item/detail/' + item.ParentProductId);
    }else{
      this.router.navigateByUrl('ui/item/detail/' + item.Id);
    }
    // if (item.VariationCount) {
    // this.router.navigateByUrl('ui/item/detail/' + item.ParentProductId);
    // } else {
    // this.increment(item);
    // }
  }

  increment(item) {
    this.item = item;
    if (item.Quantity) {
      item.Qty = item.Quantity;
    }
    if (item.Qty == undefined) {
      item.Qty = item.MOQ;
      return;
    }
    if (this.getCartList) {
      if (this.sellerid == this.EncryptSellerId) {
        if (item.Qty == null) {
          item.Qty = parseInt(item.Qty);
        } else {
          item.Qty += 1;
          if (item.Quantity) {
            item.Quantity = item.Qty;
          }
          if (this.item.SellingPrice == undefined) {
            this.item.SellingPrice = item.price;
            item.Rate = item.price;
          }
          this.Price = item.Rate;
          this.totalPrice = this.totalPrice + this.Price;
          if (item.Qty == 1) {
            this.itemQty = this.itemQty + 1;
          }

          this.CartItemDC =
          {
            // MOQ: item.MOQ,
            // Mrp: this.item.Mrp,
            // Margin: item.Margin,
            // ProductMasterId: this.item.ProductMasterId,
            // SellerId: this.sellerid,
            // BuyerId: 0,
            Quantity: item.Qty,
            // Price: this.item.SellingPrice,
            CookieValue: this.cookiesValue,
            // ImagePath: this.item.ImagePath,
            Id: this.item.Id,
            ProductVariantAttributeId: 0,
            ProductVariantId: this.productVariantId
          }
          this.loaderService.setState(true);
          this.sellerProfileService.addCart(this.CartItemDC).subscribe(res => {
            this.loaderService.setState(false);
            this.addCartList = res;
            this.loaderService.setState(true);
            this.sellerProfileService.getCartItem(this.cookiesValue).subscribe(x => {
              this.loaderService.setState(false);
              this.getCartList = x.Cart;
              this.Id = x.Id;
            })
          });
        }
      }
      else {
        this.confirmDialogService.confirm({
          bodyMessage: 'Your Cart has existing items from Another Seller.Do You Want to clear it and add items from this Seller?',
          headerMessage: ''
        }).subscribe(() => {
          this.clearAllItems();
        });

      }
    }
    if (!this.getCartList) {
      if (item.Qty == null) {
        item.Qty = parseInt(item.Qty);
      } else {
        item.Qty += 1;
        if (item.Quantity) {
          item.Quantity = item.Qty;
        }
        if (this.item.SellingPrice == undefined) {
          this.item.SellingPrice = item.price;
          item.Rate = item.price;
        }
        this.Price = item.Rate;
        this.totalPrice = this.totalPrice + this.Price;
        if (item.Qty == 1) {
          this.itemQty = this.itemQty + 1;
        }
        this.CartItemDC =
        {
          // MOQ: item.MOQ,
          // Mrp: this.item.Mrp,
          // Margin: item.Margin,
          // ProductMasterId: this.item.ProductMasterId,
          // SellerId: this.sellerid,
          // BuyerId: 0,
          Quantity: item.Qty,
          // Price: this.item.SellingPrice,
          CookieValue: this.cookiesValue,
          // ImagePath: this.item.ImagePath,
          Id: this.item.Id,
          ProductVariantAttributeId: 0,
          ProductVariantId: this.productVariantId
        }
        this.loaderService.setState(true);
        this.sellerProfileService.addCart(this.CartItemDC).subscribe(res => {
          this.loaderService.setState(false);
          this.addCartList = res;
          this.EncryptSellerId = res.EncryptSellerId;
          this.loaderService.setState(true);
          this.sellerProfileService.getCartItem(this.cookiesValue).subscribe(x => {
            this.loaderService.setState(false);
            this.getCartList = x.Cart;
            this.Id = x.Id;
          });
        });
      }
    }

  };

  decrement(item) {
    this.item = item;
    if (item.Quantity) {
      item.Qty = item.Quantity;
    }
    if (item.Qty > 0) {
      item.Qty -= 1;
      if (item.Quantity) {
        item.Quantity = item.Qty;
      }
      if (this.item.SellingPrice == undefined) {
        this.item.SellingPrice = item.price;
        item.Rate = item.price;
      }
      if (item.ProductMasterId) {
        this.item.ProductMasterId = item.ProductMasterId;
      }
      this.totalPrice = this.totalPrice - item.Rate;
      this.deleteCartItemDC = {
        CookieValue: this.cookiesValue,
        Id: item.Id
      }
      this.CartItemDC =
      {
        // MOQ: item.MOQ,
        // Mrp: this.item.Mrp,
        // Margin: item.Margin,
        // ProductMasterId: this.item.ProductMasterId,
        // SellerId: this.sellerid,
        // BuyerId: 0,
        Quantity: item.Qty,
        // Price: this.item.SellingPrice,
        CookieValue: this.cookiesValue,
        // ImagePath: this.item.ImagePath,
        Id: this.item.Id,
        ProductVariantAttributeId: 0,
        ProductVariantId: this.productVariantId
      }
      this.loaderService.setState(true);
      this.sellerProfileService.addCart(this.CartItemDC).subscribe(res => {
        this.loaderService.setState(false);
        this.addCartList = res;
        this.loaderService.setState(true);
        this.sellerProfileService.getCartItem(this.cookiesValue).subscribe(x => {
          this.loaderService.setState(false);
          this.getCartList = x.Cart;
          this.Id = x.Id;
        });
      });
      if (item.Qty == 0) {
        this.itemQty = this.itemQty - 1;
        if (this.itemQty < 0) {
          return item.Qty;
        }
      }
    } else {
      item.Qty = parseInt(item.Qty);
    }
  };

  viewcart() {
    this.router.navigateByUrl('/ui/cart');

  }
  clearAllItems() {
    this.loaderService.setState(true);
    this.sellerProfileService.clearCart(this.Id).subscribe(x => {
      this.loaderService.setState(false);
      this.getCartList = [];
      this.totalPrice = 0;
      this.itemQty = 0;
      this.EncryptSellerId = this.sellerid;
      this.increment(this.item);
      // this.getSellerProduct();
    });
  }
  addStoreView() {
    this.storeViewDC = {
      SellerId: this.sellerid
    }
    this.sellerProfileService.addStoreView(this.storeViewDC).subscribe(res => {
    });
  }
  private updateSellerProductList() {
    if (this.sellerProductList && this.sellerProductList.length > 0 && this.getCartList && this.getCartList.length > 0) {
      this.sellerProductList.forEach(selletProduct => {
        let cartItem = this.getCartList.filter(cartItem => {
          return cartItem.Id == selletProduct.Id;
        });
        if (cartItem && cartItem.length > 0) {
          selletProduct.Qty = cartItem[0].Quantity;
        }
      });
    }
  }
  private createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  variationPage(items) {
    this.router.navigateByUrl('/ui/category/variants/' + this.sellerid + '/' + items.Id);
  }
  getSellerlistforfilter(event) {
    this.sellerProductFilter = {
      SellerId: this.sellerid,
      CateogryId: 0,
      BrandId: 0,
      Latitude: this.lat1,
      Longitude: this.lng1,
      ProductName: '',
      Skip: 0,
      Take: this.rows,
      ParentProductId: 0,
      Keyword : event ? event.query : ''
    }
    this.loaderService.setState(true);
    this.sellerProfileService.getSellerProduct(this.sellerProductFilter).subscribe(x => {
      this.loaderService.setState(false);
      console.log('seller product: ', x);
      this.sellerProductList = x.SellerProductDC;
      this.addStoreView();
      this.updateSellerProductList();
      this.userDetail = x.UserDetailDC;
      this.lat2 = this.userDetail.Latitiute;
      this.lng2 = this.userDetail.Longitude;
    });
  }
  onSelectSeller(event) {
    // this.sellerProductFilter = {
    //   SellerId: this.sellerid,
    //   CateogryId: 0,
    //   BrandId: 0,
    //   Latitude: this.lat1,
    //   Longitude: this.lng1,
    //   ProductName : event ? event.ProductName : 0,
    //   Skip : 0,
    //   Take : this.rows
    // }
    // this.loaderService.setState(true);
    // this.sellerProfileService.getSellerProduct(this.sellerProductFilter).subscribe(x => {
    //   this.loaderService.setState(false);
    //   console.log('seller product: ', x);
    //   this.sellerProductList = x.SellerProductDC;
    //   this.addStoreView();
    //   this.updateSellerProductList();
    //   this.userDetail = x.UserDetailDC;
    //   this.lat2 = this.userDetail.Latitiute;
    //   this.lng2 = this.userDetail.Longitude;
    // });

  }
  onScrollDown() {
    console.log('onScrollDown');
    this.sellerProductFilter.Skip = this.sellerProductFilter.Skip + this.sellerProductFilter.Take;
    this.loaderService.setState(true);
    this.sellerProfileService.getSellerProduct(this.sellerProductFilter).subscribe(x => {
      this.loaderService.setState(false);
      if (x.SellerProductDC && x.SellerProductDC.length > 0) {
        this.sellerProductList = this.sellerProductList.concat(x.SellerProductDC);
      }
    });

  }
  topseller() {
    if (this.placed == 'topSeller') {
      this.router.navigateByUrl('ui/app-home/1');
    }
    else {
      this.router.navigateByUrl('ui/seller');
    }
  }
}
