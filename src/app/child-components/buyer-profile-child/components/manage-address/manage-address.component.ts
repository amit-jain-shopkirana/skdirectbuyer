// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Observable } from 'rxjs';
// import { UserLocationDc } from 'src/app/shared/interface/user-location-dc';
// import { BuyerAddressService } from 'src/app/shared/services/buyer-address.service';
// import { LoaderService } from 'src/app/shared/services/loader.service';

// @Component({
//   selector: 'app-manage-address',
//   templateUrl: './manage-address.component.html',
//   styleUrls: ['./manage-address.component.scss']
// })
// export class ManageAddressComponent implements OnInit {
//   @Input() location: UserLocationDc;
//   @Output() onSaveAddress: EventEmitter<boolean> = new EventEmitter<boolean>(null);
//   @Output() onClosePopup: EventEmitter<void> = new EventEmitter<void>();
//   constructor(private buyerAddressService: BuyerAddressService, private loaderService: LoaderService) { }

//   ngOnInit(): void {
//     if (!this.location) {
//       this.location = {
//         AddressOne: null,
//         AddressThree: null,
//         AddressTwo: null,
//         Id: null,
//         IsActive: true,
//         IsDelete: false,
//         IsPrimaryAddress: null,
//         Latitiute: null,
//         LocationType: null,
//         Longitude: null,
//         PinCodeMasterId: null,
//         Pincode: null,
//         UserDetailId: null,
//         City: null,
//         State: null
//       }
//     }
//   }

//   saveAddress(addressForm: NgForm) {
//     if (addressForm.valid) {
//       let httpRequest: Observable<boolean>;
//       if (!this.location.Id) {
//         httpRequest = this.buyerAddressService.addLocation([this.location]);
//       } else {
//         httpRequest = this.buyerAddressService.updateLocation([this.location]);
//       }
//       this.loaderService.setState(true);
//       httpRequest.subscribe(x => {
//         this.loaderService.setState(false);
//         this.onSaveAddress.next(x);
//       });
//     }
//   }

//   closePopup(){
//     this.onClosePopup.emit();
//   }
// }
