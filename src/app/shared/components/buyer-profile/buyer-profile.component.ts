import { nullSafeIsEquivalent, THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserProfileDetailDC } from 'src/app/pages/buyer-profile/interface/user-profile-detail-dc';
import { BuyerProfileService } from 'src/app/pages/buyer-profile/services/buyer-profile.service';

import { LayoutService } from 'src/app/shared/services/layout.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { environment } from 'src/environments/environment';
import { LocalStogareService } from '../../services/local-stogare.service';

@Component({
  selector: 'app-buyer-profile',
  templateUrl: './buyer-profile.component.html',
  styleUrls: ['./buyer-profile.component.scss']
})
export class BuyerProfileComponent implements OnInit {
  @Output() onSave: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSkip: EventEmitter<void> = new EventEmitter<void>();
  buyerProfile: UserProfileDetailDC;
  baseApiUrl: string;
  pin : any;
  userDetailPromiseResult : boolean;;
  submitted : boolean = false;
  inValidEmail : boolean = false;
  isInvalid : boolean = false;
  isValid : boolean = false;

  constructor(
    private buyerProfileService: BuyerProfileService,
    private loaderService: LoaderService,private localStogareService: LocalStogareService,
    private layoutService: LayoutService) {
    this.baseApiUrl = environment.apiBaseUrl;

  }

  ngOnInit(): void {
    this.layoutService.setModel({ showBottomNavigation: false, showTopNavigation: false, 
      isShowFullLengthContainer: true 
    });
    this.loaderService.setState(true);
    this.buyerProfileService.getUserDetail().subscribe(x => {
      this.buyerProfile = x;
      if(this.buyerProfile == null)
      {
        this.userDetailPromiseResult = true;
        this.buyerProfile ={
          UserId : '',
          Email: '',
          Pincode: '',
          ImagePath: '',
          ShopName: '',
          Name: '',
          City : '',
          State : '',
          FirstName : ''
          }
      }
      console.log(' this.buyerProfile: ', this.buyerProfile);
      this.loaderService.setState(false);
    });
  }

  onUpload(imagePath: string) {
    console.log('event: ', imagePath);
    if (imagePath) {
      this.buyerProfile.ImagePath = imagePath;
    }
  }

  checkPincode() {
    if (this.buyerProfile.Pincode.toString().length < 6) {
      this.isInvalid = true;
      this.isValid = false;
    }
    else{
    this.loaderService.setState(true);
    this.buyerProfileService.getStateCity(this.buyerProfile.Pincode).subscribe(x => {
      if(x == null)
      {
        this.isValid = true;
        this.isInvalid = false;
      }
      else{
      this.pin = x.address_components;
      if(this.pin.length == 4)
      {
        this.isValid = false;
        this.isInvalid = false;
        this.buyerProfile.City = this.pin[1].long_name;
        this.buyerProfile.State = this.pin[2].long_name;
      }
      else if(this.pin.length == 5)
      {
        this.isValid = false;
        this.isInvalid = false;
        this.buyerProfile.City = this.pin[1].long_name;
        this.buyerProfile.State = this.pin[3].long_name;
      }
    }
     
      this.loaderService.setState(false);
      console.log('x is: ', x);
    })
    }
  }
  saveDetail(mobileForm) {
    if(mobileForm.valid == true)
    {
      let httpRequest: Observable<boolean>;     
      this.buyerProfile.UserId = this.localStogareService.getItemString('ASPnetUserId');
      if (this.userDetailPromiseResult) {  
      httpRequest = this.buyerProfileService.addUserDetail(this.buyerProfile);
      } else {
        httpRequest = this.buyerProfileService.updateUserDetail(this.buyerProfile);
      }
      this.loaderService.setState(true);
      httpRequest.subscribe(x => {
        this.loaderService.setState(false);
        this.skip();
      });
    }
    else
    {
      if(mobileForm.form.controls.emailInput.status == 'INVALID')
      {
        this.inValidEmail = true;
        this.submitted = false;
      }
      this.submitted = true;
    }
  }

  skip() {
    this.onSkip.emit();
  }
  public keyPressForInput(event: any) {
    const pattern = /^[0-9]*$/;
    if (!pattern.test(event.target.value) || !event.target.value.match(/\b\d{5}\b/g)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }
  }
  public inputValidator(event: any) {
    const pattern = /^[a-zA-Z ]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, "");
    }
  }
}
