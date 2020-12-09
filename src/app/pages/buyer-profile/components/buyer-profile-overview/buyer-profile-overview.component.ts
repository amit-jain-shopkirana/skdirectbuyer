import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { zip } from 'rxjs';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SkAlertService } from 'src/app/shared/services/sk-alert.service';
import { environment } from 'src/environments/environment';
import { UserLocationDc } from '../../interface/user-location-dc';
import { UserProfileDetailDC } from '../../interface/user-profile-detail-dc';
import { BuyerProfileService } from '../../services/buyer-profile.service';


@Component({
  selector: 'app-buyer-profile-overview',
  templateUrl: './buyer-profile-overview.component.html',
  styleUrls: ['./buyer-profile-overview.component.scss']
})
export class BuyerProfileOverviewComponent implements OnInit {
  defaultUrl: string;
  buyerProfile: UserProfileDetailDC;
  baseApiUrl: string;
  isEditiongOtherInfo: boolean;
  isEditAddress: boolean;
  showAddress: boolean;
  userLocationList: UserLocationDc[];
  selectedLocation: UserLocationDc;
  deleteAddress: UserLocationDc[];
  menuItems: MenuItem[];

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private loaderService: LoaderService,
    private buyerProfileService: BuyerProfileService,
    private skAlertService : SkAlertService,
    private confirmDialogService: ConfirmDialogService
  ) {
    this.deleteAddress = [];
  }

  ngOnInit(): void {
    this.showAddress = false;
    this.isEditiongOtherInfo = false;
    this.isEditAddress = false;
    this.initializeLayout();

    this.defaultUrl = environment.defaultUrl;
    this.baseApiUrl = environment.apiBaseUrl;
    this.loaderService.setState(true);
    let userDetailPromise = this.buyerProfileService.getUserDetail();
    let userAddressPromise = this.buyerProfileService.getUserSavedLocation();
    zip(userDetailPromise, userAddressPromise)
      .subscribe(results => {
        const [userDetailPromiseResult, userAddressPromiseResult] = results;
        console.log('userDetailPromiseResult: ', userDetailPromiseResult);
        console.log('userAddressPromiseResult: ', userAddressPromiseResult);
        this.buyerProfile = userDetailPromiseResult;
        this.userLocationList = userAddressPromiseResult;
        if (!this.buyerProfile) {
          this.buyerProfile = {
            City: null,
            Email: null,
            FirstName: null,
            ImagePath: null,
            Name: null,
            Pincode: null,
            ShopName: null,
            State: null,
            UserId: null
          }
        }
        // this.updateUserDetailToView();
        this.loaderService.setState(false);
      });


  }

  goToHome() {
    this.router.navigateByUrl(this.defaultUrl);
  }

  updateUserDetailToView() {
    // this.buyerProfile.name = (this.buyerProfile.FirstName ? this.buyerProfile.FirstName : '');
    // this.buyerProfile.name += (this.buyerProfile.MiddleName ? ' ' + this.buyerProfile.MiddleName : '');
    // this.buyerProfile.name += (this.buyerProfile.LastName ? ' ' + this.buyerProfile.LastName : '');
  }

  editOtherInfo() {
    this.isEditiongOtherInfo = true;
  }
  deleteLoc(location) {
    if(location.IsPrimaryAddress == true)
    {
      this.skAlertService.open({
        bodyMessage: 'Default selected address cannot be delete!',
        headerMessage: '',
        isShowAlert: true
      }).subscribe(() => {
      })
    }
    else{
        this.confirmDialogService.confirm({
          headerMessage: '',
          bodyMessage: 'Are You Sure You Want to Delete this Address?',
        }).subscribe(() => {
          location = {
            AddressOne: location.AddressOne,
            AddressThree: location.AddressThree,
            AddressTwo: location.AddressTwo,
            City: location.City,
            Id: location.Id,
            IsActive: location.IsActive,
            IsDelete: true,
            IsPrimaryAddress: location.IsPrimaryAddress,
            Latitiute: location.Latitiute,
            LocationType: location.LocationType,
            Longitude: location.Longitude,
            PinCodeMasterId: location.PinCodeMasterId,
            Pincode: location.Pincode,
            State: location.State,
            UserDetailId: location.UserDetailId,
          }
          this.deleteAddress.push(location);
          this.loaderService.setState(true);
          this.buyerProfileService.updateUserLocation(this.deleteAddress).subscribe(x => {
            this.loaderService.setState(false);
            this.ngOnInit();
          })
        });
      }
  }
  onSkipEditOtherInfo() {
    this.isEditiongOtherInfo = false;
    this.ngOnInit();
    // this.initializeLayout();
  }

  onToggleAddress(event) {
    console.log('event: ', event);
  }

  addNewAddress() {
    this.selectedLocation = null;
    this.isEditAddress = true;
  }

  editLocation(location: UserLocationDc) {
    this.selectedLocation = location;
    this.isEditAddress = true;
  }

  onSaveAddress(event: any, isAddressSaved: boolean) {
    if (isAddressSaved) {
      this.loaderService.setState(true);
      this.buyerProfileService.getUserSavedLocation().subscribe(x => {
        this.userLocationList = x;
        if(this.buyerProfile != null && this.userLocationList.length == 1)
        {
          this.skAlertService.open({
            bodyMessage: 'Profile Updated Successfully!',
            headerMessage: '',
            isShowAlert: true
          }).subscribe(() => {
            this.router.navigateByUrl('ui/app-home/1');
          })
        }
        this.isEditAddress = false;
        this.loaderService.setState(false);

      });
    } else {
      this.isEditAddress = false;
    }
  }

  private initializeLayout() {
    this.layoutService.setModel({
      showBottomNavigation: true,
      showTopNavigation: false,
      // isShowFullLengthContainer: false
    });
  }

  getMenuItemsForItem(loc: any): MenuItem[] {
    const context = loc;
    return this.menuItems = [{
      label: 'Select option',
      items: [{
        label: 'Make Default',
        icon: '',
        command: e => {
          this.makeDefault(context);
          console.log('context: ', context);
        }
      },
      {
        label: 'Edit',
        icon: '',
        command: e => {
          this.editLocation(context);
        }
      },
      {
        label: 'Delete',
        icon: '',
        command: e => {
          this.deleteLoc(context);;
        }
      }
      ]
    }];
  }

  makeDefault(userLocDC: UserLocationDc) {
    this.confirmDialogService.confirm({
      bodyMessage: 'Are you sure that you want to make this Address Default?',
      headerMessage: '',
    }).subscribe(x => {
      this.buyerProfileService.makeDefaultAddress(userLocDC.Id).subscribe(x => {
      })
      this.userLocationList.forEach(x => {
        x.IsPrimaryAddress = false;
      });
      userLocDC.IsPrimaryAddress = true;
    })
      ;
  }
}

