import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { skip } from 'rxjs/operators';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { environment } from 'src/environments/environment';
import { SellerService } from '../../services/seller.service';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.scss']
})
export class SellerListComponent implements OnInit {

  centered = false;
  disabled = false;
  sellerList: any[];
  baseUrl: string;
  rows: number;
  skip : number;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  constructor(private sellerService: SellerService, private loaderService: LoaderService, private router: Router) {
    this.baseUrl = environment.apiBaseUrl;
  }

  ngOnInit(): void {
    this.skip = 0;
    this.rows = 5;
    this.loaderService.setState(true);
    this.sellerService.topSeller(this.skip,this.rows).subscribe(x => {
      this.sellerList = x;
      this.loaderService.setState(false);
      console.log('x is: ', x);
    })
  }
  
  onScrollDown() {
    console.log('onScrollDown Testing');
    this.skip = this.skip + this.rows;
    this.loaderService.setState(true);
    this.sellerService.topSeller(this.skip,this.rows).subscribe(x => {
      this.loaderService.setState(false);
      if (x && x.length > 0) {
        this.sellerList = this.sellerList.concat(x);
      }
    });

  }

  onSelectSeler(seller: any) {
    console.log('seller is: ', seller);
    this.loaderService.setState(true);
    this.sellerService.encryptSellerId(seller.Id).subscribe(x => {
      console.log('encryptedId: ', x);
      this.loaderService.setState(false);
      this.router.navigateByUrl('ui/seller/' + x);
    })
  }
  topseller()
  {
    this.router.navigateByUrl('ui/app-home/1');
  }

}
export interface Section {
  name: string;
  updated: Date;
}