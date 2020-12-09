import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { LocalStogareService } from 'src/app/shared/services/local-stogare.service';
import { SkAlertService } from 'src/app/shared/services/sk-alert.service';
import { environment } from 'src/environments/environment';
import { ChangePasswordDC } from '../../interface/change-password-dc';
import { BuyerProfileService } from '../../services/buyer-profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  Mobile : string;
  mob : any;
  ConfirmPwd : any;
  password : any;
  changePasswordDC : ChangePasswordDC;
  defaultUrl : string;
  constructor(private skAlertService : SkAlertService,private buyerProfileServices : BuyerProfileService
    ,private localStorage: LocalStogareService,private router : Router,private layoutService: LayoutService,) { this.mob = {};}

  ngOnInit(): void {
    // this.mob.Mobile='7999620960';
    this.defaultUrl = environment.defaultUrl;
    this.mob.Mobile = this.localStorage.getItemString('Phone');
    this.initializeLayout();
  }
  goToHome() {
    this.router.navigateByUrl(this.defaultUrl);
  }
  private initializeLayout() {
    this.layoutService.setModel({
      showBottomNavigation: true,
      showTopNavigation: false,
      // isShowFullLengthContainer: false
    });
  }

  saveDetail(mobileForm)
  {
    if(this.mob.password != this.mob.ConfirmPwd)
    {
      this.skAlertService.open({
        bodyMessage: 'Password & Confirm Password is mismatch',
        headerMessage: 'Error',
        isShowAlert: true
      }).subscribe(() => {
      })
    }
    else{
      this.changePasswordDC ={
        Password : this.mob.password,
        ConfirmPassword : this.mob.ConfirmPwd
      }
      this.buyerProfileServices.changePassword(this.changePasswordDC).subscribe(res=>
        {
          this.skAlertService.open({
          bodyMessage: 'Password Changed Successfully',
          headerMessage: '',
          isShowAlert: true
        }).subscribe(() => {
          this.router.navigateByUrl('/ui/app-home/1');
        })
        });
    }
  }

}
