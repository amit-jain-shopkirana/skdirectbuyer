import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nearby-item',
  templateUrl: './nearby-item.component.html',
  styleUrls: ['./nearby-item.component.scss']
})
export class NearbyItemComponent implements OnInit {
  @Input() topNearItems: any[];  
  baseUrl: string;
  PageId : any;
  constructor(private router: Router) {this.baseUrl = environment.apiBaseUrl; }

  ngOnInit(): void {
    console.log('topNearItems: ', this.topNearItems);
  }

  viewAllItems(){
    this.router.navigateByUrl('ui/category/item');
  }
  productDetail(category)
  {
    this.PageId = 1;
    this.router.navigateByUrl('ui/item/detail/' + category.Id + '/' + this.PageId); 
  }

  imageNotFound(category){
    category.notFound = true;
    console.log('image not found: ', category);
  }
}
