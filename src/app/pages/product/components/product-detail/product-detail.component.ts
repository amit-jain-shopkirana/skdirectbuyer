import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AppHomeWidgetDc } from 'src/app/pages/app-home/interfaces/app-home-widget-dc';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { LocalStogareService } from 'src/app/shared/services/local-stogare.service';
import { SellerProductDetailService } from '../../services/seller-product-detail.service';
import { CartHelper } from '../../../../shared/helper/cart-helper'
import { ProductViewDC } from 'src/app/pages/seller/interface/SellerProductFilter';
import { SellerProfileService } from 'src/app/pages/seller/services/seller-profile.service';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';
import { LocalCartService } from 'src/app/shared/services/local-cart.service';
import { CartFilter } from '../../interfaces/cart-filterDC';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() sellerProductIdAttribute: number | null;
  showVariants: boolean;
  sellerProductId: number;
  productDetail: any;
  appHomeWidgetDc: AppHomeWidgetDc;
  selectedProduct: any;
  cart: any;
  cookiesValue: string;
  token: string;
  productViewDC: ProductViewDC;
  // sellerid: string;
  // EncryptSellerId: any;
  Id: string;
  quantity: any;
  // cartItemList: any;
  productPageId: any;
  brandId: any;
  productVariantId: any[];
  productVariantAttributeId: any;
  cartFilter: CartFilter;
  /* 
   *this component works as both 
   *as display from route
   *also uses as tag
   *But route param have higher priority    
  */

  constructor(private route: ActivatedRoute
    , private sellerProductDetailService: SellerProductDetailService
    , private loaderService: LoaderService
    , private localStorage: LocalStogareService
    , private cookieService: CookieService
    , private sellerProfileService: SellerProfileService
    , private router: Router
    , private confirmDialogService: ConfirmDialogService
    , private localCartService: LocalCartService
    , private localStogareService: LocalStogareService) {
    this.productVariantId = [];
  }

  ngOnInit(): void {
    this.showVariants = false;
    this.productVariantAttributeId = 0;
    // this.sellerid = this.localStorage.getItemString('SellerId');
    if (this.sellerProductIdAttribute) {
      this.sellerProductId = this.sellerProductIdAttribute;
    }
    else {
      this.route.params.subscribe(params => {
        this.sellerProductId = params["sellerProductId"];
        this.productPageId = params["PageId"];
        this.brandId = params["BrandId"];
        console.log('this.sellerProductId: ', this.sellerProductId);
      });
    }

    this.getCart();
    this.loaderService.setState(true);
    this.sellerProductDetailService.getSellerProductById(this.sellerProductId).subscribe(x => {
      this.productDetail = x.ResultItem;
      console.log('this.productDetail: ', this.productDetail);
      this.cartFilter = {
        Id: this.productDetail.ParentProductId == 0 ? this.productDetail.SellerId : 0,
        ParentProductId: this.productDetail.ParentProductId > 0 ? this.productDetail.ParentProductId : 0
      }
      // this.sellerProductDetailService.getProductDetailsForCart(this.cartFilter).subscribe(x => {
      // })
      this.selectDefaultProduct();
      this.setWidget();
      this.getCartItem();
      this.addproductView();
      this.loaderService.setState(false);
    });
  }


  selectDefaultProduct() {
    if (this.productDetail && this.productDetail.VariationList && this.productDetail.VariationList.length > 0) {
      this.selectedProduct = this.productDetail.VariationList[0];
      this.selectedProduct.isSelected = true;
    } else {
      this.selectedProduct = this.productDetail;
    }
  }

  openVariantWidnow() {
    this.showVariants = true;
  }

  changeVariation(variation) {
    console.log('variation: ', variation);
    this.loaderService.setState(true);
    setTimeout(() => {
      this.productDetail.VariationList.forEach(element => {
        element.isSelected = false;
      });
      this.selectedProduct = variation;
      this.selectedProduct.isSelected = true;
      // this.getCart();

      this.setWidget();
      // this.showVariants = false;
      this.loaderService.setState(false);
    }, 500);

  }

  updateProductQuantity(quantity: number, detail) {
    console.log('quantity is: ', quantity);
    this.quantity = quantity;
    if (this.cart && this.cart.Cart.length && this.cart.Cart.length != 0) {
      // if (true) {
      if (this.cart.EncryptSellerId == this.productDetail.EncryptSellerId) {
        this.loaderService.setState(true);
        this.selectedProduct.Quantity = (this.selectedProduct.Quantity ? this.selectedProduct.Quantity : 0) + quantity;
        if (this.selectedProduct.Quantity == 1) {
          if (detail) {
            for (var i in detail) {
              this.productVariantId.push(detail[i].Id);
            }
          }
        }

        let viewModel = CartHelper.GetModelToUpdateItemQuantity(this.selectedProduct.Id, this.selectedProduct.Quantity, this.cookiesValue, this.productVariantAttributeId, this.productVariantId);
        this.sellerProductDetailService.addCartItem(viewModel).subscribe(x => {
          this.getCart();
          this.localCartService.updateLocalCart();
        })
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
    else {
      this.loaderService.setState(true);
      this.selectedProduct.Quantity = (this.selectedProduct.Quantity ? this.selectedProduct.Quantity : 0) + quantity;
      if (this.selectedProduct.Quantity == 1) {
        if (detail) {
          for (var i in detail) {
            this.productVariantId.push(detail[i].Id);
          }
        }
      }
      this.token = this.localStogareService.getItemString(this.localStogareService.tokenKey);
      this.cookiesValue = this.cookieService.get("name");
      let viewModel = CartHelper.GetModelToUpdateItemQuantity(this.selectedProduct.Id, this.selectedProduct.Quantity, this.cookiesValue, this.productVariantAttributeId, this.productVariantId);
      this.sellerProductDetailService.addCartItem(viewModel).subscribe(x => {
        this.localCartService.updateLocalCart();
      })
      // this.loaderService.setState(false);
    }
  }

  private getCart() {
    this.localCartService.localCart.subscribe(x => {
      this.cart = x;
      this.loaderService.setState(false);
      console.log('this.cart is: ', this.cart);
    });

  }

  addproductView() {
    this.productViewDC = {
      ProductId: this.sellerProductId
    }
    this.sellerProfileService.addProductView(this.productViewDC).subscribe(res => {
    });
  }


  openCheckout() {
    this.router.navigateByUrl('ui/cart');
  }

  private updateValue() {
    console.log('this.cart: ', this.cart);
    this.selectedProduct.Quantity = 0;
    if (this.cart && this.cart.Cart && this.cart.Cart.length > 0) {
      this.cart.Cart.forEach(element => {
        if (this.selectedProduct.Id == element.Id) {
          this.selectedProduct.Quantity = element.Quantity;
        }
      });
    }
  }

  private setWidget() {
    this.appHomeWidgetDc = null;
    setTimeout(() => {
      this.appHomeWidgetDc = {
        WidgetConfList: this.selectedProduct.ImageList,
        AppHomeId: null,
        Id: null,
        IsSingleWidgetOnly: false,
        Sequence: 0,
        TopSellerList: null,
        WidgetTypName: null,
        WidgetTypeMasterId: null,
        isDragEnter: null
      }
    }, 50);
  }

  private createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  back() {
    if (this.productPageId == 1) {
      this.router.navigateByUrl('ui/app-home/1');
    }
    else if (this.productPageId == 2) {
      this.router.navigateByUrl('ui/category/item');
    }
    else if (this.productPageId == 3) {
      this.router.navigateByUrl('ui/category/brand');
    }
    else if (this.productPageId == 4) {
      this.router.navigateByUrl('ui/category/item/' + this.brandId + '/' + null + '/' + this.productPageId);
    }
    else {
      this.router.navigateByUrl('ui/seller/' + this.productDetail.EncryptSellerId);
    }

  }

  getCartItem() {
    this.sellerProfileService.getCartItem(this.cookiesValue).subscribe(x => {
      this.loaderService.setState(false);
      this.cart = x;
      console.log('cart is: ', x);
      if (x && x.Cart.length != 0) {
        // this.productDetail.EncryptSellerId = x.EncryptSellerId;
        this.Id = x.Id;
      }
    });
  }


  clearAllItems() {
    this.loaderService.setState(true);
    this.sellerProfileService.clearCart(this.Id).subscribe(x => {
      this.loaderService.setState(false);
      this.sellerProfileService.getCartItem(this.cookiesValue).subscribe(x => {
        this.loaderService.setState(false);
        this.cart = x;
        this.updateProductQuantity(this.quantity, '');
      });
      // this.getCart();
    });
  }

  getDefaultImage(variation) {
    if (variation && variation.ImageList && variation.ImageList.length > 0) {
      let images = variation.ImageList.filter(elem => { return elem.IsDefaultShow });
      if (images && images.length > 0) {
        return environment.apiBaseUrl + images[0].ImagePath;
      }
    }
    return '';
  }
}
