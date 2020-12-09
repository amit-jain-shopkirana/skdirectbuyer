import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AddressPopupComponent } from 'src/app/pages/seller/components/address-popup/address-popup.component';
import { OrderPlacedComponent } from 'src/app/pages/seller/components/order-placed/order-placed.component';
import { PlaceOrderDC } from 'src/app/pages/seller/interface/SellerProductFilter';
import { CartOverviewService } from 'src/app/pages/seller/services/cart-overview.service';
import { SellerProfileService } from 'src/app/pages/seller/services/seller-profile.service';
import { SellerService } from 'src/app/pages/seller/services/seller.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { UserLocationDc } from 'src/app/shared/interface/user-location-dc';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { LocalStogareService } from 'src/app/shared/services/local-stogare.service';
import { ConfirmationService } from 'primeng/api';
import { SkAlertService } from 'src/app/shared/services/sk-alert.service';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  paymentMode: string;
  cookiesValue: any;
  checkOutDetail: any;
  placeOrderDC: PlaceOrderDC;
  PrimaryAddress: any;
  addressId: any;
  locationId: any;
  addressList: any[];
  radioSelected: any;
  afterInit: boolean;
  isInvalid: boolean = false;
  DeliveryOption: string;
  Pickup: any;
  HomeDelivery: any;

  selectedLocation: UserLocationDc;
  showEditAddressDialog: boolean = false;
  SellerId: any;
  deliveryOptionList: any;
  constructor(private cartOverviewService: CartOverviewService, private cookieService: CookieService
    , private sellerService: SellerService, private sellerProfileService: SellerProfileService
    // , public dialog: MatDialog, 
    , private route: ActivatedRoute, private localStorage: LocalStogareService
    // , private _bottomSheet: MatBottomSheet
    , private layoutService: LayoutService
    , private router: Router
    , private loaderService: LoaderService
    , private corfirmService: ConfirmDialogService
    , private skAlertService: SkAlertService) {

  }

  ngOnInit(): void {
    this.layoutService.setModel({
      showBottomNavigation: false,
      showTopNavigation: false
    });

    this.paymentMode = null;
    this.cookiesValue = this.cookieService.get("name");
    // this.sellerService.UpdateCartByBuyer(this.cookiesValue).subscribe(result => {

      this.cartOverviewService.getCheckOutItem(this.cookiesValue).subscribe(x => {
        this.checkOutDetail = x;
        this.SellerId = this.checkOutDetail.EncryptSellerId;
        this.afterInit = true;
        console.log('this.checkOutDetail', this.checkOutDetail);
        this.cartOverviewService.getDeliveryOption(this.SellerId).subscribe(x => {
          this.deliveryOptionList = x;
          console.log('checkoutabc', x)
        });
      })
    // })
    this.sellerService.getUserLocation().subscribe(res => {
      this.addressList = res;
      this.selectAddress();
      console.log('  this.addressList :', this.addressList);
    })
    // this.SellerId = this.localStorage.getItemString('SellerId');
    
  }

  delivery(DeliveryOption) {
    this.DeliveryOption = DeliveryOption;
  }

  placeOrder() {
    if (!this.locationId) {
      this.isInvalid = true;
    }
    else {
      this.isInvalid = false;
      if(this.DeliveryOption == undefined)
      {
        this.skAlertService.open({
          bodyMessage: 'Select Delivery Option First?',
          headerMessage: 'Error',
          isShowAlert: true
        }).subscribe(() => {
        })
      }
      else
      {
        if(this.checkOutDetail.TotalAmount == 0)
        {
          this.skAlertService.open({
            bodyMessage: 'Select Atleast 1 qty of Product to place order! ',
            headerMessage: 'Error',
            isShowAlert: true
          }).subscribe(() => {
          })
        }else{
          this.corfirmService.confirm({
            bodyMessage: 'Press Yes to proceed?'
          }).subscribe(() => {
            this.placeOrderDC = {
              UserLocationId: this.locationId,
              MongoId: this.checkOutDetail.Id,
              DeliveryOption: this.DeliveryOption,
              PaymentMode : 'CASH'
            }
            this.loaderService.setState(true);
            this.sellerService.placeOrder(this.placeOrderDC).subscribe(x => {
              if (x == true) {
                this.clearAllItems();
                this.skAlertService.open({
                  bodyMessage: 'Order Placed Successfully',
                  headerMessage: 'Congratulations',
                  isShowAlert: true
                }).subscribe(() => {
                  this.router.navigateByUrl('ui/my-trade/my-order');
                });
                this.loaderService.setState(false);
              }
            });
          });
        } 
    }
    }

  }

  openDialog(): void {
    // const dialogRef = this.dialog.open(OrderPlacedComponent, {
    //   width: '350px',
    //   data: "Do you confirm the deletion of this data?"
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log('Yes clicked');
    //   }
    // });
  }
  clearAllItems() {
    this.sellerProfileService.clearCart(this.checkOutDetail.Id).subscribe(x => {
      this.openDialog();
    });
  }
  addAddress() {
    // this._bottomSheet.open(AddressPopupComponent);
  }

  navigateToSeller() {
    this.router.navigateByUrl('/ui/seller');
  }

  reviewBasket() {
    this.router.navigateByUrl('/ui/cart');
  }

  onUpdateAddress(isSaved: boolean) {
    this.showEditAddressDialog = false;
    this.selectedLocation = null;
    this.sellerService.getUserLocation().subscribe(res => {
      this.addressList = res;
    });
  }

  closeEditAddress() {
    this.selectedLocation = null;
    this.showEditAddressDialog = false;
  }
  openAddNewAddress() {
    this.selectedLocation = null;
    this.showEditAddressDialog = true;
  }
  onChangeAddress(address) {
    this.locationId = address.Id
  }

  private selectAddress() {
    this.locationId = null;
    if (this.addressList && this.addressList.length > 0) {
      let primaryAddress = this.addressList.filter(element => {
        return element.IsPrimaryAddress;
      });
      if (primaryAddress && primaryAddress.length > 0) {
        this.locationId = primaryAddress[0].Id;
      } else {
        this.locationId = this.addressList[0].Id;
      }
    }
  }
}
