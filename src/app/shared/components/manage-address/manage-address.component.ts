import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserLocationDc } from 'src/app/pages/buyer-profile/interface/user-location-dc';
import { BuyerProfileService } from 'src/app/pages/buyer-profile/services/buyer-profile.service';

import { LoaderService } from 'src/app/shared/services/loader.service';
import { GoogleAddressHelper } from '../../helper/google-address-helper';
import { SkAlertService } from '../../services/sk-alert.service';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.scss']
})
export class ManageAddressComponent implements OnInit {
  @Input() location: UserLocationDc;
  @Output() onSaveAddress: EventEmitter<boolean> = new EventEmitter<boolean>(null);
  @Output() onClosePopup: EventEmitter<void> = new EventEmitter<void>();
  pin: any;
  isInvalid: boolean = false;
  isValid: boolean = false;
  constructor(private buyerProfileService: BuyerProfileService
    , private loaderService: LoaderService, private skAlertService: SkAlertService) { }

  ngOnInit(): void {
    if (!this.location) {
      this.location = {
        AddressOne: null,
        AddressThree: null,
        AddressTwo: null,
        Id: null,
        IsActive: true,
        IsDelete: false,
        IsPrimaryAddress: null,
        Latitiute: null,
        LocationType: null,
        Longitude: null,
        // PinCodeMasterId: null,
        Pincode: null,
        UserDetailId: null,
        City: null,
        State: null
      }
    }
  }
  checkPincode() {
    if (this.location.Pincode.toString().length < 6) {
      this.isInvalid = true;
    }
    else {
      this.loaderService.setState(true);
      this.buyerProfileService.getStateCity(this.location.Pincode).subscribe(x => {
        if (x == null) {
          this.isValid = true;
          this.isInvalid = false;
        }
        else {
          this.pin = x.address_components;
          if (this.pin.length == 4) {
            this.isValid = false;
            this.isInvalid = false;
            this.location.City = this.pin[1].long_name;
            this.location.State = this.pin[2].long_name;
          }
          else if (this.pin.length == 5) {
            this.isValid = false;
            this.isInvalid = false;
            this.location.City = this.pin[1].long_name;
            this.location.State = this.pin[3].long_name;
          }
          else if (this.pin.length == 6) {
            this.isValid = false;
            this.isInvalid = false;
            this.location.City = this.pin[1].long_name;
            this.location.State = this.pin[4].long_name;
          }
        }

        this.loaderService.setState(false);
        console.log('x is: ', x);
      })
    }
  }

  saveAddress(addressForm: NgForm) {
    if (this.location.Pincode.toString().length < 6) {
      // this.isInvalid = true;
      this.isValid = false;
    }
    else {
      this.isInvalid = false;
      this.isValid = false;
      if (addressForm.valid) {
        let httpRequest: Observable<boolean>;
        if (!this.location.Id) {
          httpRequest = this.buyerProfileService.addLocation([this.location]);
        } else {
          httpRequest = this.buyerProfileService.updateUserLocation([this.location]);
        }
        this.loaderService.setState(true);
        httpRequest.subscribe(x => {
          this.loaderService.setState(false);
          this.onSaveAddress.next(x);
        });
      }
    }
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

  getCurrentLocation() {
    this.loaderService.setState(true);
    navigator.geolocation.getCurrentPosition((pos: Position) => {
      console.log('posssss:', pos);
      let lat = pos.coords.latitude;
      let lng = pos.coords.longitude;
      this.buyerProfileService.getLocation(lat, lng).subscribe(x => {
        this.loaderService.setState(false);
        console.log('locations is:', x);

        console.log('x.formatted_address: ', x.formatted_address);

        let pincode = GoogleAddressHelper.getPinCode(x);
        this.location.Pincode = pincode;

        let state = GoogleAddressHelper.getState(x);
        this.location.State = state;

        let city = GoogleAddressHelper.getCity(x);
        this.location.City = city;

        let landMark = GoogleAddressHelper.getLandmark(x);
        this.location.AddressThree = landMark;

        let premise = GoogleAddressHelper.getPremiseAddress(x);
        this.location.AddressTwo = premise;

        this.location.Latitiute = lat;
        this.location.Longitude = lng;
      })
    },
      err => {
        this.skAlertService.open({
          bodyMessage: 'Please Enable Your Current Location',
          headerMessage: '',
          isShowAlert: true
        }).subscribe(() => {
          this.loaderService.setState(false);
        })
      });
  }

  closePopup() {
    this.onClosePopup.emit();
  }
}
