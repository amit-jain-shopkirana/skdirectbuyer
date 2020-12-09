import { Component, OnInit, Input } from '@angular/core';
import { TopSellerDc } from 'src/app/pages/app-home/interfaces/top-seller-dc';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-seller-widget',
  templateUrl: './top-seller-widget.component.html',
  styleUrls: ['./top-seller-widget.component.scss']
})
export class TopSellerWidgetComponent implements OnInit {
  @Input() topSellerList: TopSellerDc[];  
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  topSeller : any;
  baseUrl: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
      this.baseUrl = environment.apiBaseUrl;
    console.log('topSellerList: ', this.topSellerList);
  }

  viewAllSellers() {
    this.router.navigateByUrl('ui/seller');
  }

  openTopSeller(seller: TopSellerDc) {
    this.topSeller = 'topSeller'
    // this.router.navigateByUrl('/ui/seller/' + seller.EncryptedId + '/' + this.topSeller);
    this.router.navigateByUrl('/ui/seller/' + this.topSeller + '/' + seller.EncryptedId );
  }
}
