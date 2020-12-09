import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { GlobalSearchFilter } from 'src/app/pages/app-home/interfaces/global-search-filter-dc';
import { AppHomeService } from 'src/app/pages/app-home/services/app-home.service';
import { BuyerProfileService } from 'src/app/pages/buyer-profile/services/buyer-profile.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { NavService } from 'src/app/shared/services/nav.service';
import { WindowService } from 'src/app/shared/services/window.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  items: MenuItem[];
  isSidebarOpened: boolean;
  buyerProfile : any;
  globalSearchFilter : GlobalSearchFilter;
  rows : number;
  ProductName : any;
  sellerProductList : any;
  baseUrl: string;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  showList : boolean= false;

  constructor(public navService: NavService
    , private authService: AuthService
    , private router: Router
    , private loaderService: LoaderService
    , private windowService: WindowService
    , private buyerProfileService : BuyerProfileService
    , private appHomeService : AppHomeService) {this.baseUrl = environment.apiBaseUrl; }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Profile',
        icon: 'pi pi-user-edit',
        routerLink: '/ui/buyer-profile',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Change Password',
        icon: 'pi pi-user-edit',
        routerLink: '/ui/buyer-profile/changepassword',
        routerLinkActiveOptions: { exact: true },
      }
    ];
    this.rows = 5;
    this.buyerProfileService.getUserDetail().subscribe(x=>
      {
        this.buyerProfile = x;
      })
  }

  logout() {
    this.loaderService.setState(true);
    setTimeout(() => {
      this.authService.logout();
      this.loaderService.setState(false);
      this.router.navigateByUrl('login');
    }, 1000);

  }

  openCloseSidebar(isSidebarOpened) {
    this.isSidebarOpened = isSidebarOpened;
  }

  openBuyerApp(){
    this.windowService.windowHref(environment.sellerAppUrl);
  }

  getSellerProductlistforfilter(event) {
    this.globalSearchFilter= {
      Keyword : event,
      Skip : 0,
      Take : this.rows
    }
    this.loaderService.setState(true);
    this.appHomeService.globalSearch(this.globalSearchFilter).subscribe(x => {
      this.loaderService.setState(false);
      console.log('product11: ', x);
     this.sellerProductList = x;
     this.showList = true;
    });
  }
  onScrollDown() {
    console.log('onScrollDown Testing');
    this.globalSearchFilter.Skip = this.globalSearchFilter.Skip + this.globalSearchFilter.Take;
    this.loaderService.setState(true);
    this.appHomeService.globalSearch(this.globalSearchFilter).subscribe(x => {
      this.loaderService.setState(false);
      if (x && x.length > 0) {
        this.sellerProductList = this.sellerProductList.concat(x);
      }
    });

  }
  onSelectSeller(event) {
    this.loaderService.setState(true);
    this.appHomeService.encryptSellerId(event.Id).subscribe(x => {
      this.loaderService.setState(false);
      console.log('sellerId: ', x);
      if(x != null)
      {
        this.ProductName = '';
        this.showList = false;
        this.router.navigateByUrl('ui/seller/'+ x);
      }
     
    });  }
}
