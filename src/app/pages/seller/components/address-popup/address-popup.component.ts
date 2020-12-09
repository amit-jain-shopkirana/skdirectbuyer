import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LocalStogareService } from 'src/app/shared/services/local-stogare.service';
import { SilentLoginService } from 'src/app/pages/silent-login/services/silent-login.service';

@Component({
  selector: 'app-address-popup',
  templateUrl: './address-popup.component.html',
  styleUrls: ['./address-popup.component.scss']
})
export class AddressPopupComponent implements OnInit {
  addressList : any;
  // radioSel:any;
  radioSelected:string;
  radioSelectedString:string;
  @Output() radioSel = new EventEmitter();
  cookiesValue : any;
  addAddress : boolean = false;
  data : any;
  shipPinList : any;
  billPinList: any;
  shipPincode : boolean = false;
  isInvalid : boolean = false;
  hidePincode : boolean = false;
  dataList : any[];

  constructor( private sellerService : SellerService,
    
    private router : Router,private localStorage : LocalStogareService
    ,private silentLoginService : SilentLoginService
    ,private cookieService : CookieService) {this.data = {}; this.dataList=[];}

  ngOnInit(): void {
    
  
    }
  submit(event: MouseEvent,userEditForm,data,shipPin,pin)
  {
    if (userEditForm.form.status == "VALID") {
      if(data.radioSelected == 'Billing')
      {
        data.IsPrimaryBillingAddress = true;
        data.LocationTypeB = 'Billing';
        data.IsPrimaryShippingAddress = false;
        data.LocationTypeS = 'Shipping';
      }
      else{
        data.IsPrimaryShippingAddress = true;
        data.LocationTypeS = 'Shipping'
        data.IsPrimaryBillingAddress = false;
        data.LocationTypeB = 'Billing';
      }
      let billing =
      {
        Id :  null,        
        UserDetailId : null,
        AddressOne : data.BillingAddressOne,
        AddressTwo : data.BillingAddressTwo,
        AddressThree : data.BillingAddressThree,
        PinCodeMasterId : pin.Id,
        IsActive : true,
        IsDelete : false,
        LocationType : data.LocationTypeB,
        IsPrimaryAddress : data.IsPrimaryBillingAddress,
        Latitiute : 0,
        Longitude : 0,
        Pincode  : ''
        }
      let shipping =
      {
        Id :  null,        
        UserDetailId : null,
        AddressOne : data.ShippingAddressOne,
        AddressTwo : data.ShippingAddressTwo,
        AddressThree : data.ShippingAddressThree,
        PinCodeMasterId : shipPin.Id,
        IsActive : true,
        IsDelete : false,
        LocationType : data.LocationTypeS,
        IsPrimaryAddress : data.IsPrimaryShippingAddress,
        Latitiute : 0,
        Longitude : 0,
        Pincode  : ''
      }
      this.dataList.push(billing,shipping);
      this.silentLoginService.AddUserLocation(this.dataList).subscribe(x=>
        {
          if(x== true)
          {
            // this._bottomSheetRef.dismiss();
            event.preventDefault();
          }
        })
   }
   else{
    this.isInvalid = true;
   }
}
 
  getSelecteditem(){    
    this.radioSel = this.addressList.find(Item => Item.LocationType == this.radioSelected);
    this.radioSelectedString = JSON.stringify(this.radioSel);
  }
  openLink(event: MouseEvent): void {
    // this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  onItemChange(event: MouseEvent,item): void{
    this.cookiesValue = this.cookieService.get('name');
    this.localStorage.set('AddressId',item.Id);
    this.radioSel = this.addressList.find(Item => Item.LocationType == this.radioSelected);
    this.radioSelectedString = JSON.stringify(this.radioSel);
    // this._bottomSheetRef.dismiss();
    event.preventDefault();
    this.router.navigateByUrl('/ui/cart/'+ this.cookiesValue);
    
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  
  shippingPincodeSearch(myControl)
  {
    this.silentLoginService.getByPinAsync(myControl).subscribe(x=>
      {
        this.shipPinList = x;
        if(this.shipPinList == null)
        {
          this.shipPincode = false;
        }
        else{
          this.shipPincode = true;
        }          
      })
  }
  billingPincodeSearch(myControl)
  {
    this.silentLoginService.getByPinAsync(myControl).subscribe(x=>
      {
        this.billPinList = x;
        if(this.billPinList == null)
        {
          this.hidePincode = false;
        }
        else{
          this.hidePincode = true;
        }          
      })
  }
  public inputValidator(event: any) {
    const pattern = /^[a-zA-Z ]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, "");
    }
  }
  reset()
  {
    this.hidePincode = false;
  }
  resetShipPin()
  {
    this.shipPincode = false;
  }
}
